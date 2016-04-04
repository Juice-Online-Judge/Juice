<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1;
use App\Questions\JudgeRepository;
use App\Questions\Question;
use Ramsey\Uuid\Uuid;

class QuestionController extends ApiController
{
    /**
     * Get questions.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $questions = Question::with(['tags'])->isPublic()->paginate(null, ['id', 'uuid', 'title', 'created_at']);

        pluck_relation_field($questions->items(), 'tags', 'name', 'id');

        return $this->setData($questions)->responseOk();
    }

    /**
     * Create a new question.
     *
     * @param V1\QuestionRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(V1\QuestionRequest $request)
    {
        $question = new Question($request->only(['title', 'description', 'public']));

        $question->setAttribute('uuid', $request->input('uuid', '') ?: Uuid::uuid4()->toString())
            ->setAttribute('judge', []);

        if (! $question->save()) {
            return $this->responseUnknownError();
        }

        $question->setAttribute('judge', (new JudgeRepository($request, $question->getAttribute('id')))->getJudge());

        $question->save();
        
        if ($request->has('tag')) {
            $question->tags()->sync($request->input('tag'));
        }

        return $this->setData($question->fresh(['tags']))->responseCreated();
    }

    /**
     * Get question content.
     *
     * @param string $uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($uuid)
    {
        $question = Question::with(['tags'])->isPublic()->where('uuid', $uuid)->first();

        if (is_null($question)) {
            return $this->responseNotFound();
        }

        pluck_relation_field($question, 'tags', 'name', 'id');

        return $this->setData($question)->responseOk();
    }
}
