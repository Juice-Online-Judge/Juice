<?php

namespace App\Tags;

use App\Core\Entity;
use App\Questions\Question;
use DB;

class Tag extends Entity
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * 取得指定標籤的所有題目.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function questions()
    {
        return $this->morphedByMany(Question::class, 'taggable');
    }

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::deleting(function (Tag $tag) {
            DB::table('taggables')
                ->where('tag_id', $tag->getAttribute('id'))
                ->delete();
        });
    }
}
