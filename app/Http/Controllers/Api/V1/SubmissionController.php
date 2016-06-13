<?php

namespace App\Http\Controllers\Api\V1;

use App\Events\V1\CodeSubmitted;
use App\Exams\Exam;
use App\Exams\TokenRepository;
use App\Http\Requests\Api\V1\Cli\SubmissionRequest as CliSubmissionRequest;
use App\Http\Requests\Api\V1\SubmissionRequest;
use App\Questions\Question;
use App\Submissions\Repository;
use App\Submissions\Submission;
use Carbon\Carbon;
use File;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;

class SubmissionController extends ApiController
{
    /**
     * User submit code using web interface.
     *
     * @param SubmissionRequest $request
     * @param string $uuid
     *
     * @return \Dingo\Api\Http\Response
     */
    public function storeUsingWeb(SubmissionRequest $request, $uuid)
    {
        return $this->store(
            $uuid,
            $this->user->getKey(),
            [
                'exam_id'  => $request->input('exam_id'),
                'language' => $request->input('language'),
                'code'     => $request->input('code', $request->file('code')),
            ]
        );
    }

    /**
     * User submit code using turn in program.
     *
     * @param CliSubmissionRequest $request
     * @param string $uuid
     *
     * @return \Dingo\Api\Http\Response
     */
    public function storeUsingCli(CliSubmissionRequest $request, $uuid)
    {
        $data = TokenRepository::getData($request->input('token'));

        if (is_null($data)) {
            $this->response->errorUnauthorized('Token mismatch.');
        } elseif (! in_array($uuid, $data['questions'])) {
            $this->response->errorNotFound('Exam question not found.');
        }

        return $this->store(
            $uuid,
            $data['userId'],
            [
                'exam_id'  => $data['examId'],
                'language' => $request->input('language'),
                'code'     => $request->file('code'),
            ]
        );
    }

    /**
     * Store data into database.
     *
     * @param string $uuid
     * @param int $userId
     * @param array $input
     *
     * @return \Dingo\Api\Http\Response
     */
    protected function store($uuid, $userId, array $input)
    {
        if (! is_null($input['exam_id'])) {
            $exam = Exam::where('began_at', '<=', Carbon::now())
                ->where('ended_at', '>=', Carbon::now())
                ->where('id', $input['exam_id'])
                ->exists();

            if (! $exam) {
                $this->response->errorForbidden();
            }
        }

        $question = Question::where('uuid', $uuid)->firstOrFail(['id']);

        $submission = $question->submissions()->save(new Submission([
            'user_id'      => $userId,
            'exam_id'      => $input['exam_id'],
            'language'     => $input['language'],
            'submitted_at' => Carbon::now(),
        ]));

        if (false === $submission || ! $this->storeCode($submission, $input['code'])) {
            $this->response->errorInternal();
        }

        event(new CodeSubmitted());

        return $this->response->created(null, $submission->fresh());
    }

    /**
     * Save the submitted code.
     *
     * @param Submission $submission
     * @param $code
     *
     * @return bool
     */
    protected function storeCode(Submission $submission, $code)
    {
        $repository = new Repository($submission);

        if (! $repository->save($code)) {
            return false;
        }

        $submission->setAttribute('code', $repository->getPath());

        return $submission->save();
    }

    /**
     * Get submission and judge info.
     *
     * @param int $submissionId
     *
     * @return \Dingo\Api\Http\Response
     */
    public function show($submissionId)
    {
        $submission = Submission::with(['question' => function (BelongsTo $query) {
            $query->getBaseQuery()->select(['id', 'uuid', 'title']);
        }])->findOrFail($submissionId);

        $this->authorize($submission);

        return $submission;
    }

    /**
     * Update submission correctness.
     *
     * @param Request $request
     * @param int $id
     *
     * @return \Dingo\Api\Http\Response
     */
    public function update(Request $request, $id)
    {
        $submission = Submission::with(['judge'])->findOrFail($id);

        $this->authorize($submission);

        if ($request->has('correctness') && number_between($request->input('correctness'), 0, 100)) {
            $submission->getRelation('judge')->update([
                'correctness' => $request->input('correctness'),
                'score'       => -1,
            ]);
        }

        return $submission;
    }

    /**
     * Get the recent submit records.
     *
     * @return \Dingo\Api\Http\Response
     */
    public function recent()
    {
        $submissions = Submission::with(['question' => function (BelongsTo $query) {
            $query->getBaseQuery()->select(['id', 'uuid', 'title']);
        }])
            ->where('user_id', request_user(true))
            ->orderBy('submitted_at', 'desc')
            ->paginate(5);

        return $submissions;
    }

    /**
     * Get the submission code.
     *
     * @param int $submissionId
     *
     * @return \Dingo\Api\Http\Response
     */
    public function code($submissionId)
    {
        $submission = Submission::findOrFail($submissionId);

        $this->authorize($submission);

        try {
            $code = File::get($submission->getAttribute('code'));
        } catch (FileNotFoundException $e) {
            return $this->responseUnknownError();
        }

        return $code;
    }
}
