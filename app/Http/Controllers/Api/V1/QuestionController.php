<?php

namespace App\Http\Controllers\Api\V1;

use App\Entities\Question;
use App\Http\Requests\Api\V1;

class QuestionController extends ApiController
{
    /**
     * Create a new question.
     *
     * @param V1\QuestionRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(V1\QuestionRequest $request)
    {
        $question = Question::create($request->only([
            'title', 'description', 'test_data', 'restriction', 'public',
        ]));

        if (! $question->exists) {
            return $this->responseUnknownError();
        }

        return $this->setData($question->fresh())->responseCreated();
    }

    /**
     * Get question content.
     *
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $question = Question::find($id);

        if (is_null($question)) {
            return $this->responseNotFound();
        }

        return $this->setData($question)->responseOk();
    }
}
