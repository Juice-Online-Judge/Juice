<?php

namespace App\Judges;

use App\Core\Entity;

class Judge extends Entity
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
    protected $hidden = ['id', 'submission_id', 'correctness'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['correctness', 'score'];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['judged_at'];
}
