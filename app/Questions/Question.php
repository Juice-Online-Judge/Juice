<?php

namespace App\Questions;

use App\Core\Entity;
use App\Submissions\Submission;
use App\Tags\Tag;

class Question extends Entity
{
    /**
     * The model's attributes.
     *
     * @var array
     */
    protected $attributes = [
        'judge' => [],
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['id', 'user_id', 'public'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'description', 'public'];

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
     * Get the judge info.
     *
     * @param  string  $value
     * @return array
     */
    public function getJudgeAttribute($value)
    {
        $judge = json_decode($value, true);

        unset($judge['input'], $judge['output']);

        return $judge;
    }

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

    /**
     * 取得該題的標籤.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
