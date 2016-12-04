<?php

namespace App\Exams;

use JWTAuth;
use JWTFactory;
use Carbon\Carbon;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Exams\Exception\UnavailableException;
use App\Exams\Exception\AccessDeniedException;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class TokenRepository
{
    /**
     * @var int
     */
    private $examId;

    /**
     * @var int
     */
    private $userId;

    /**
     * @var string|null
     */
    private $token;

    /**
     * Get the data according to the token.
     *
     * @param string $token
     *
     * @return array|null
     */
    public static function getData($token)
    {
        try {
            return JWTAuth::decode(JWTAuth::setToken($token)->getToken())->toArray();
        } catch (JWTException $e) {
            return null;
        }
    }

    /**
     * Get the unique identify exam token to auth user.
     *
     * @param int $examId
     * @param int $userId
     * @return string
     */
    public function getToken($examId, $userId)
    {
        $this->setExamId($examId)->setUserId($userId);

        return $this->generateTokenIfNotExists()->token;
    }

    /**
     * Generate the identify token if token not exists.
     *
     * @return $this
     */
    protected function generateTokenIfNotExists()
    {
        if (! is_null($this->token)) {
            return $this;
        }

        $exam = $this->getExam();

        $payload = JWTFactory::setTTL(Carbon::now()->diffInMinutes($exam->getAttribute('ended_at')->addMinutes(5), false))
            ->make([
                'examId'    => $exam->getAttribute('id'),
                'userId'    => $this->userId,
                'questions' => $exam->getRelation('questions')->pluck('uuid')->toArray(),
            ]);

        $this->token = JWTAuth::encode($payload)->get();

        return $this;
    }

    /**
     * Get the exam model.
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    protected function getExam()
    {
        $now = Carbon::now();

        $exam = Exam::with([
            'questions' => function (BelongsToMany $query) {
                $query->getBaseQuery()->select(['id', 'uuid']);
            },
            'users'     => function (BelongsToMany $query) {
                $query->wherePivot('user_id', $this->userId);
            },
        ])
            ->findOrFail($this->examId);

        if ($exam->getRelation('users')->isEmpty()) {
            throw new AccessDeniedException;
        } elseif ($exam->getAttribute('began_at') > $now->copy()->addMinutes(5) || $exam->getAttribute('ended_at') < $now) {
            throw new UnavailableException;
        }

        return $exam;
    }

    /**
     * @param int $examId
     * @return $this
     */
    public function setExamId($examId)
    {
        $this->examId = $examId;

        return $this;
    }

    /**
     * @param int $userId
     * @return $this
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }
}
