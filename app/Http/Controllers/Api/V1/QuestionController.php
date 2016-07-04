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
     * @return \Dingo\Api\Http\Response
     */
    public function store(QuestionRequest $request)
    {
        $question = new Question($request->only(['uuid', 'title', 'description', 'public']));

        if (! $question->save()) {
            $this->response->errorInternal();
        }

        $question->setAttribute('judge', (new JudgeRepository($request, $question->getKey()))->getJudge());

        $question->save();

        if ($request->has('tag')) {
            $question->tags()->sync($request->input('tag'));
        }

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
        return Question::where('uuid', $uuid)->mayPublic()->firstOrFail();
    }
}
