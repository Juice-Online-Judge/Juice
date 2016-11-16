<?php

namespace App\Questions;

use App\Core\Entity;
use App\Submissions\Submission;
use App\Tags\Tag;
use Dingo\Api\Facade\API;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;
use Request;

class Question extends Entity
{
    use SoftDeletes;

    /**
     * The model's attributes.
     *
     * @var array
     */
    protected $attributes = [
        'judge' => '',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['id', 'user_id', 'public', 'deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['uuid', 'title', 'description', 'public'];

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
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['tags'];

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
        $relation = $this->morphToMany(Tag::class, 'taggable');

        $relation->getBaseQuery()->select(['id', 'name']);

        return $relation;
    }

    /**
     * Scope a query to only include public questions if the user is not manager.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeMayPublic($query)
    {
        $user = API::user();

        if (is_null($user) || ! $user->hasRole(['teacher', 'ta'])) {
            return $query->where('public', true);
        }

        return $query;
    }

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
     * Set the question uuid.
     *
     * @param  string|null  $value
     *
     * @return string
     */
    public function setUuidAttribute($value)
    {
        if (is_null($value)) {
            $value = Uuid::uuid4()->toString();
        }

        $this->attributes['uuid'] = $value;

        return $this;
    }

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function (self $question) {
            $question->setAttribute('user_id', API::user()->getKey());
        });

        static::saved(function (self $question) {
            static $saved = false;

            if (Request::has('tag') && ! $saved) {
                $question->tags()->sync(Request::input('tag'));

                $saved = true;
            }
        });
    }
}
