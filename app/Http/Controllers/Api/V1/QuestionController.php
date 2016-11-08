<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Api\V1\QuestionRequest;
use App\Questions\JudgeRepository;
use App\Questions\Question;

class QuestionController extends ApiController
{
    /**
     * Get all questions.
     *
     * @return \Dingo\Api\Http\Response
     */
    public function index()
    {
        return Question::mayPublic()
            ->latest()
            ->paginate(null, ['id', 'uuid', 'title']);
    }

    /**
     * Create a new question.
     *
     * @param QuestionRequest $request
     *
     * @return Question
     */
    public function store(QuestionRequest $request)
    {
        $question = new Question($request->only(['uuid', 'title', 'description', 'public']));

        if (! $question->save()) {
            $this->response->errorInternal();
        }

        $question->setAttribute('judge', JudgeRepository::fromRequest($question->getKey()));

        $question->save();

        return $question->fresh();
    }

    /**
     * Get the specific question content.
     *
     * @param string $uuid
     *
     * @return \Dingo\Api\Http\Response
     */
    public function show($uuid)
    {
        $question = Question::where('uuid', $uuid)
            ->mayPublic()
            ->first(['id', 'uuid', 'title', 'description', 'judge', 'created_at', 'updated_at']);

        if (is_null($question)) {
            $this->response->errorNotFound();
        }

        return $question;
    }
}
