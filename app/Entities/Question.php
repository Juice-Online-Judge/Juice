<?php

namespace App\Entities;

use App\Entities\Core\Entity;

class Question extends Entity
{
    /**
     * The model's attributes.
     *
     * @var array
     */
    protected $attributes = [
        'restriction' => [
            'time'    => 3.0,
            'memory'  => 8,
            'file'    => 3,
            'library' => [],
        ],
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'test_data', 'restriction', 'public',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'restriction' => 'array',
        'public'      => 'boolean',
    ];

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
