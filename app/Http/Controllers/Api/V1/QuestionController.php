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
        $questions = Question::isPublic()->paginate(null, ['id', 'uuid', 'title', 'created_at']);

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
        $question = Question::isPublic()->find($id);

        if (is_null($question)) {
            return $this->responseNotFound();
        }

        return $this->setData($question)->responseOk();
    }
}
