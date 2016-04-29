<?php

namespace App\Http\Controllers\Api\V1;

use App\Exams\Exam;
use App\Exams\Exception\AccessDeniedException;
use App\Exams\Exception\UnavailableException;
use App\Exams\TokenRepository;
use App\Http\Requests\Api\V1\ExamRequest;
use App\Questions\Question;
use Carbon\Carbon;
use Gate;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ExamController extends ApiController
{
    /**
     * ExamController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');

        $this->middleware('role:admin', ['only' => ['store']]);
    }

    /**
     * Get the exam list.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $exams = Exam::with(['role'])->where('ended_at', '>=', Carbon::now());

        if (! request_user()->hasRole(['admin'])) {
            $exams = $exams->whereHas('users', function (Builder $query) {
                $query->where('user_id', request_user(true));
            });
        }

        $exams = $exams->paginate();

        return $this->setData($exams)->responseOk();
    }

    /**
     * Create a new exam.
     *
     * @param ExamRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ExamRequest $request)
    {
        $exam = new Exam($request->only(['name']));

        $exam->setAttribute('user_id', request_user(true))
            ->setAttribute('role_id', $request->has('role_id') ? $request->input('role_id') : null)
            ->setAttribute('began_at', Carbon::parse($request->input('began_at'))->timezone('Asia/Taipei'))
            ->setAttribute('ended_at', Carbon::parse($request->input('ended_at'))->timezone('Asia/Taipei'));

        if (! $exam->save()) {
            return $this->responseUnknownError();
        }

        $exam->questions()->sync($this->getQuestionFromRequest($request));

        $exam->users()->sync($request->input('user', []));

        return $this->setData($exam->fresh())->responseCreated();
    }

    /**
     * Get the question input from request.
     *
     * @param Request $request
     * @return array
     */
    protected function getQuestionFromRequest(Request $request)
    {
        $questions = [];

        $indexes = (new Collection($request->input('question', [])))->keyBy('uuid')->toArray();

        Question::whereIn('uuid', $request->input('question.*.uuid', []))
            ->get(['id', 'uuid'])
            ->each(function (Question $question) use (&$questions, $indexes) {
                $questions[$question->getAttribute('id')] = [
                    'info' => $indexes[$question->getAttribute('uuid')]['info'],
                ];
            });

        return $questions;
    }

    /**
     * Get exam info.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $exam = Exam::with([
            'role',
            'questions' => function (BelongsToMany $query) { $query->getBaseQuery()->select(['id', 'uuid', 'title']); },
            'users' => function (BelongsToMany $query) { $query->getBaseQuery()->select(['id', 'username', 'nickname']); },
        ])->findOrFail($id);

        $this->authorize($exam);

        move_up_pivot_attributes(
            $exam->getRelation('questions'),
            ['question_id' => 'id', 'info'],
            true,
            function (Question $question) {
                $question->setHidden(['user_id', 'public']);
            }
        );

        remove_pivot($exam->getRelation('users'));

        return $this->setData($exam)->responseOk();
    }

    /**
     * Get the exam questions.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function questions($id)
    {
        $exam = Exam::with(['questions' => function (BelongsToMany $query) {
            $query->getBaseQuery()->select(['id', 'uuid', 'title', 'description', 'judge']);
        }])->findOrFail($id);

        $this->authorize($exam);

        move_up_pivot_attributes($exam->getRelation('questions'), ['info']);

        return $this->setData($exam->getRelation('questions'))->responseOk();
    }

    /**
     * Get the exam submissions record.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function submissions($id)
    {
        $exam = Exam::findOrFail($id);

        $this->authorize($exam);

        $exam->load([
            'submissions' => function (HasMany $query) use ($exam) {
                $query->getBaseQuery()->latest('submitted_at');

                if (! Gate::allows('isManager', $exam)) {
                    $query->getBaseQuery()->where('user_id', request_user(true));
                }
            },
            'submissions.user' => function (BelongsTo $query) { $query->getBaseQuery()->select(['id', 'username', 'nickname']); },
            'submissions.question' => function (BelongsTo $query) { $query->getBaseQuery()->select(['id', 'uuid', 'title']); },
        ]);

        return $this->setData($exam->getRelation('submissions'))->responseOk();
    }

    /**
     * Get the exam scores record.
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function scores($id)
    {
        $exam = Exam::findOrFail($id);

        $this->authorize($exam);

        $exam->load(['users' => function (BelongsToMany $query) use ($exam) {
            if (! Gate::allows('isManager', $exam)) {
                $query->wherePivot('user_id', request_user(true));
            }

            $query->getBaseQuery()->select(['id', 'username', 'nickname']);
        }]);

        move_up_pivot_attributes($exam->getRelation('users'), ['score']);

        return $this->setData($exam->getRelation('users'))->responseOk();
    }

    /**
     * Update the exam info.
     *
     * @param ExamRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ExamRequest $request, $id)
    {
        $exam = Exam::findOrFail($id);

        if ($exam->getAttribute('ended_at') < Carbon::now()) {
            return $this->setMessages(['The exam is ended.'])->responseNotFound();
        }

        $exam->fill($request->only(['name', 'began_at', 'ended_at']));

        if ($request->has('role_id')) {
            $exam->setAttribute('role_id', $request->input('role_id'));
        }

        if (! $exam->save()) {
            return $this->responseUnknownError();
        }

        $exam->questions()->sync($request->input('question', []));

        $exam->users()->sync($request->input('user', []));

        return $this->setData($exam->fresh())->responseOk();
    }

    /**
     * Get the exam auth token for JWT.
     *
     * @param int $id
     * @param TokenRepository $repository
     * @return \Illuminate\Http\JsonResponse
     */
    public function token($id, TokenRepository $repository)
    {
        try {
            $token = $repository->getToken($id, request_user(true));
        } catch (ModelNotFoundException $e) {
            return $this->setMessages(['The exam is not exists.'])->responseNotFound();
        } catch (AccessDeniedException $e) {
            return $this->setMessages(['You are not the member of the exam.'])->responseForbidden();
        } catch (UnavailableException $e) {
            return $this->setMessages(['The exam is not available.'])->responseForbidden();
        }

        return $this->setData($token)->responseOk();
    }
}
