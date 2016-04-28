<?php

namespace App\Submissions;

use App\Accounts\User;
use App\Core\Entity;
use App\Exams\Exam;
use App\Judges\Judge;
use App\Questions\Question;

class Submission extends Entity
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['user_id', 'question_id', 'exam_id', 'code'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'exam_id', 'language', 'submitted_at'];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['submitted_at'];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['judge'];

    /**
     * 取得使用者.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Submission 的題目.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    /**
     * Submission 所屬測驗.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    /**
     * Submission 的 judge 結果.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function judge()
    {
        return $this->hasOne(Judge::class);
    }
}
