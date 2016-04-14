<?php

namespace App\Exams;

use App\Exams\Exception\AccessDeniedException;
use App\Exams\Exception\UnavailableException;
use Cache;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

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
     * @return array
     */
    public static function getData($token)
    {
        return Cache::tags(['exam', 'token'])->get($token);
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

        $this->token = $this->generateToken();

        Cache::add($this->token, [
            'examId'    => $exam->getAttribute('id'),
            'userId'    => $this->userId,
            'questions' => $exam->getRelation('questions')->pluck('uuid')->toArray(),
        ], $exam->getAttribute('ended_at')->addMinutes(15));

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
            'questions' => function (BelongsToMany $query) { $query->getBaseQuery()->select(['id', 'uuid']); },
            'users'     => function (BelongsToMany $query) { $query->wherePivot('user_id', $this->userId); },
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
     * Generate the token.
     *
     * @return string
     */
    protected function generateToken()
    {
        return md5(microtime()).Str::quickRandom(16);
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
