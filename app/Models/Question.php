<?php

namespace App\Models;

use App\Models\Core\Entity;

class Question extends Entity
{
    /**
     * The model's attributes.
     *
     * @var array
     */
    protected $attributes = [
        'restriction' => [
            'time' => 3.0,
            'memory' => 8,
            'file' => 3,
            'library' => [],
        ],
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'restriction' => 'array',
        'public' => 'boolean',
    ];
}
