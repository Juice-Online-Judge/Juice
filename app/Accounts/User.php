<?php

namespace App\Accounts;

use App\Core\Entity;
use App\Submissions\Submission;
use Illuminate\Auth\Authenticatable;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User extends Entity implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token', 'created_at', 'updated_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['username', 'nickname', 'email'];

    /**
     * 使用者所屬群組.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * 使用者所有 submit 的紀錄.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function submissions()
    {
        return $this->hasMany(Submission::class)->whereNull('exam_id');
    }

    /**
     * 確認使用者是否擁有指定身份.
     *
     * @param array|mixed $role
     * @return bool
     */
    public function hasRole($role)
    {
        /* @var $roles \Illuminate\Support\Collection */

        static $roles = null;

        if (is_null($roles)) {
            $roles = $this->load(['roles'])->getRelation('roles')->pluck('name');
        }

        if ($roles->contains('admin')) {
            return true;
        }

        $role = is_array($role) ? $role : func_get_args();

        return collect($role)->diff($roles)->isEmpty();
    }
}
