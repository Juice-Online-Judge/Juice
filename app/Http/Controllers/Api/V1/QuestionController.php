<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\QuestionRequest;
use App\Questions\JudgeRepository;
use App\Questions\Question;
use Illuminate\Database\Eloquent\Relations\Relation;
use Ramsey\Uuid\Uuid;

class QuestionController extends ApiController
{
    /**
     * Get questions.
     *
     * @return \Dingo\Api\Http\Response
     */
    public function index()
    {
        $questions = Question::with(['tags' => function (Relation $query) {
            $query->getBaseQuery()->select(['id', 'name']);
        }])->latest();

        if (is_null($this->user) || ! $this->user->hasRole(['admin'])) {
            $questions = $questions->isPublic();
        }

        return $questions->paginate(null, ['id', 'uuid', 'title', 'created_at']);
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
        $question = new Question($request->only(['title', 'description', 'public']));

        $question->setAttribute('user_id', $this->user->getKey())
            ->setAttribute('uuid', $request->input('uuid', Uuid::uuid4()->toString()));

        if (! $question->save()) {
            $this->response->errorInternal();
        }

        $question->setAttribute('judge', (new JudgeRepository($request, $question->getKey()))->getJudge());

        $question->save();

        if ($request->has('tag')) {
            $question->tags()->sync($request->input('tag'));
        }

        return $this->response->created(null, $question->fresh(['tags']));
    }

    /**
     * Get question content.
     *
     * @param string $uuid
     *
     * @return \Dingo\Api\Http\Response
     */
    public function show($uuid)
    {
        $question = Question::with(['tags' => function (Relation $query) {
            $query->getBaseQuery()->select(['id', 'name']);
        }])->where('uuid', $uuid);

        if (is_null($this->user) || ! $this->user->hasRole(['admin'])) {
            $question = $question->isPublic();
        }

        return $question->firstOrFail();
    }
}
