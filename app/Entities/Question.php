<?php

namespace App\Entities;

use App\Entities\Core\Entity;

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
     * 取得該題所有 submit 紀錄.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }
}
