<?php

namespace App\Http\Controllers\Api\V1;

use App\Entities\Question;
use App\Entities\Submission;
use App\Http\Requests\Api\V1;

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
            'user_id'   => $request->user()->getAuthIdentifier(),
            'code'      => $request->input('code'),
        ]));

        if (false === $created) {
            return $this->responseUnknownError();
        }

        return $this->responseCreated();
    }
}
