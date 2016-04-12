<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\SubmissionRequest;
use App\Questions\Question;
use App\Submissions\Repository;
use App\Submissions\Submission;
use Carbon\Carbon;
use File;
use Illuminate\Contracts\Filesystem\FileNotFoundException;

class SubmissionController extends ApiController
{
    /**
     * User submit code.
     *
     * @param SubmissionRequest $request
     * @param string $uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(SubmissionRequest $request, $uuid)
    {
        $question = Question::where('uuid', $uuid)->firstOrFail(['id']);

        $submission = $question->submissions()->save(new Submission([
            'user_id'      => $request->user()->getAuthIdentifier(),
            'language'     => $request->input('language'),
            'submitted_at' => Carbon::now(),
        ]));

        if (false === $submission || $this->storeCode($submission, $request->input('code', $request->file('code')))) {
            return $this->responseUnknownError();
        }

        return $this->setData($submission->fresh())->responseCreated();
    }

    /**
     * Save the submitted code.
     *
     * @param Submission $submission
     * @param $code
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($submissionId)
    {
        $submission = Submission::findOrFail($submissionId);

        $this->authorize($submission);

        return $this->setData($submission)->responseOk();
    }

    /**
     * Get the submission code.
     *
     * @param int $submissionId
     * @return \Illuminate\Http\JsonResponse
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

        return $this->setData($code)->responseOk();
    }
}
