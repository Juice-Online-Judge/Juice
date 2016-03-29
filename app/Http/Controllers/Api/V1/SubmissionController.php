<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1;
use App\Questions\Question;
use App\Submissions\Submission;
use Illuminate\Http\Request;

class SubmissionController extends ApiController
{
    /**
     * User submit code.
     *
     * @param V1\SubmissionRequest $request
     * @param $questionId
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(V1\SubmissionRequest $request, $questionId)
    {
        $question = Question::find($questionId, ['id']);

        if (is_null($question)) {
            return $this->responseNotFound();
        }

        $created = $question->submissions()->save(new Submission([
            'user_id' => $request->user()->getAuthIdentifier(),
            'code'    => $request->input('code'),
        ]));

        if (false === $created) {
            return $this->responseUnknownError();
        }

        return $this->responseCreated();
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
