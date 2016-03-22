<?php

namespace App\Entities\User;

use App\Entities\Core\Entity;
use App\Entities\Submission;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

class User extends Entity implements AuthenticatableContract
{
    use Authenticatable;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token', 'created_at', 'updated_at'];

    /**
     * 使用者所有 submit 的紀錄.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }
}
