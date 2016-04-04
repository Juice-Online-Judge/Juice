<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\SubmissionRequest;
use App\Questions\Question;
use App\Submissions\Repository;
use App\Submissions\Submission;
use Carbon\Carbon;
use Illuminate\Http\Request;

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
        $question = Question::where('uuid', $uuid)->first(['id']);

        if (is_null($question)) {
            return $this->responseNotFound();
        }

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
     * @param Request $request
     * @param $submissionId
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request, $submissionId)
    {
        $submission = Submission::find($submissionId);

        if (is_null($submission)) {
            return $this->responseNotFound();
        } elseif ($submission->getAttribute('user_id') != $request->user()->getAuthIdentifier()) {
            return $this->responseForbidden();
        }

        return $this->setData($submission)->responseOk();
    }
}
