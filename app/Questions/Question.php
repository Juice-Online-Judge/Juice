<?php

namespace App\Questions;

use App\Core\Entity;
use App\Submissions\Submission;

class Question extends Entity
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['id', 'user_id', 'public'];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'judge'  => 'array',
        'public' => 'boolean',
    ];

    /**
     * Scope a query to only include questions of a given type.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param bool $public
     * @return $this
     */
    public function scopeIsPublic($query, $public = true)
    {
        return $query->where('public', $public);
    }

    /**
     * 取得該題所有 submit 紀錄.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }
}
