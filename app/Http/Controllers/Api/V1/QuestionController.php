<?php

namespace App\Http\Controllers\Api\V1;

use App\Entities\Question;
use App\Http\Requests\Api\V1;
use Ramsey\Uuid\Uuid;

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
        $question = new Question($request->only(['title', 'description', 'public']));

        $question->setAttribute('uuid', $request->has('uuid') ? $request->input('uuid') : Uuid::uuid4()->toString());

        // parse judge field

        if (! $question->save()) {
            return $this->responseUnknownError();
        }

        return $this->setData($question->fresh())->responseCreated();
    }

    /**
     * Get question content.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $question = Question::where('public', true)->find($id);

        if (is_null($question)) {
            return $this->responseNotFound();
        }

        return $this->setData($question)->responseOk();
    }
}
