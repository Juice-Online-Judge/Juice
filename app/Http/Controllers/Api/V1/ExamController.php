<?php

namespace App\Http\Controllers\Api\V1;

use App\Exams\Exam;
use App\Exams\Exception\AccessDeniedException;
use App\Exams\Exception\UnavailableException;
use App\Exams\TokenRepository;
use App\Http\Requests;
use App\Http\Requests\Api\V1\ExamRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;

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
        $exams = Exam::paginate();

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
        $exam = new Exam($request->only(['name', 'began_at', 'ended_at']));

        $exam->setAttribute('user_id', $request->user()->getAuthIdentifier())
            ->setAttribute('role_id', $request->has('role_id') ? $request->input('role_id') : null);

        if (! $exam->save()) {
            return $this->responseUnknownError();
        }

        return $this->setData($exam->fresh())->responseCreated();
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
        
        return $this->setData($exam)->responseOk();
    }

    /**
     * Get the exam auth token for JWT.
     *
     * @param Request $request
     * @param int $id
     * @param TokenRepository $repository
     * @return \Illuminate\Http\JsonResponse
     */
    public function token(Request $request, $id, TokenRepository $repository)
    {
        try {
            $token = $repository->getToken($id, $request->user()->getAuthIdentifier());
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
