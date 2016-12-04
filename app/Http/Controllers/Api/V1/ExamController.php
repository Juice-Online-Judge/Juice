<?php

namespace App\Http\Controllers\Api\V1;

use Gate;
use Carbon\Carbon;
use App\Exams\Exam;
use App\Questions\Question;
use Illuminate\Http\Request;
use App\Exams\TokenRepository;
use Illuminate\Support\Collection;
use App\Http\Requests\Api\V1\ExamRequest;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Api\ApiController;
use App\Exams\Exception\UnavailableException;
use App\Exams\Exception\AccessDeniedException;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ExamController extends ApiController
{
    /**
     * ExamController constructor.
     */
    public function __construct()
    {
        $this->middleware('role:admin', ['only' => ['store']]);
    }

    /**
     * Get the exam list.
     *
     * @return \Dingo\Api\Http\Response
     */
    public function index()
    {
        $exams = Exam::with(['role'])->where('ended_at', '>=', Carbon::now());

        if (! $this->user->hasRole(['admin'])) {
            $exams = $exams->whereHas('users', function (Builder $query) {
                $query->where('user_id', $this->user->getKey());
            });
        }

        return $exams->paginate();
    }

    /**
     * Create a new exam.
     *
     * @param ExamRequest $request
     *
     * @return \Dingo\Api\Http\Response
     */
    public function store(ExamRequest $request)
    {
        $exam = new Exam($request->only(['name']));

        $exam->setAttribute('user_id', $this->user->getKey())
            ->setAttribute('role_id', $request->has('role_id') ? $request->input('role_id') : null)
            ->setAttribute('began_at', Carbon::parse($request->input('began_at'))->timezone('Asia/Taipei'))
            ->setAttribute('ended_at', Carbon::parse($request->input('ended_at'))->timezone('Asia/Taipei'));

        if (! $exam->save()) {
            $this->response->errorInternal();
        }

        $exam->questions()->sync($this->getQuestionFromRequest($request));

        $exam->users()->sync($request->input('user', []));

        return $this->response->created(null, $exam->fresh());
    }

    /**
     * Get the question input from request.
     *
     * @param Request $request
     *
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
     *
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model
     */
    public function show($id)
    {
        $exam = Exam::with([
            'role',
            'questions' => function (Relation $query) {
                $query->select(['id', 'uuid', 'title']);
            },
            'users' => function (Relation $query) {
                $query->select(['id', 'username', 'nickname']);
            },
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

        return $exam;
    }

    /**
     * Get the exam questions.
     *
     * @param int $id
     *
     * @return \Dingo\Api\Http\Response
     */
    public function questions($id)
    {
        $exam = Exam::with(['questions' => function (Relation $query) {
            $query->select(['id', 'uuid', 'title', 'description', 'judge']);
        }])->findOrFail($id);

        $this->authorize($exam);

        move_up_pivot_attributes($exam->getRelation('questions'), ['info']);

        return $exam->getRelation('questions');
    }

    /**
     * Get the exam submissions record.
     *
     * @param int $id
     *
     * @return \Dingo\Api\Http\Response
     */
    public function submissions($id)
    {
        $exam = Exam::findOrFail($id);

        $this->authorize($exam);

        $exam->load([
            'submissions' => function (Relation $query) use ($exam) {
                $query->latest('submitted_at');

                if (! Gate::allows('isManager', $exam)) {
                    $query->where('user_id', $this->user->getKey());
                }
            },
            'submissions.user' => function (Relation $query) {
                $query->select(['id', 'username', 'nickname']);
            },
            'submissions.question' => function (Relation $query) {
                $query->select(['id', 'uuid', 'title']);
            },
        ]);

        return $exam->getRelation('submissions');
    }

    /**
     * Get the exam scores record.
     *
     * @param $id
     *
     * @return \Dingo\Api\Http\Response
     */
    public function scores($id)
    {
        $exam = Exam::findOrFail($id);

        $this->authorize($exam);

        $exam->load(['users' => function (Relation $query) use ($exam) {
            if (! Gate::allows('isManager', $exam)) {
                $query->wherePivot('user_id', $this->user->getKey());
            }

            $query->select(['id', 'username', 'nickname']);
        }]);

        move_up_pivot_attributes($exam->getRelation('users'), ['score']);

        return $exam->getRelation('users');
    }

    /**
     * Update the exam info.
     *
     * @param ExamRequest $request
     * @param int $id
     *
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model
     */
    public function update(ExamRequest $request, $id)
    {
        $exam = Exam::findOrFail($id);

        if ($exam->getAttribute('ended_at') < Carbon::now()) {
            $this->response->errorNotFound('The exam is ended.');
        }

        $exam->fill($request->only(['name', 'began_at', 'ended_at']));

        if ($request->has('role_id')) {
            $exam->setAttribute('role_id', $request->input('role_id'));
        }

        if (! $exam->save()) {
            $this->response->errorInternal();
        }

        $exam->questions()->sync($request->input('question', []));

        $exam->users()->sync($request->input('user', []));

        return $exam->fresh();
    }

    /**
     * Get the exam auth token for JWT.
     *
     * @param int $id
     * @param TokenRepository $repository
     *
     * @return string
     */
    public function token($id, TokenRepository $repository)
    {
        try {
            return $repository->getToken($id, $this->user->getKey());
        } catch (ModelNotFoundException $e) {
            $this->response->errorNotFound('The exam is not exists.');
        } catch (AccessDeniedException $e) {
            $this->response->errorForbidden('You are not the member of the exam.');
        } catch (UnavailableException $e) {
            $this->response->errorForbidden('The exam is not available.');
        }
    }
}
