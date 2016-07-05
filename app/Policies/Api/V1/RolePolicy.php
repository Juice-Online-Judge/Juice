<?php

namespace App\Policies\Api\V1;

use App\Accounts\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RolePolicy
{
    use HandlesAuthorization;

    /**
     * Check the user has index permission.
     *
     * @param User $user
     *
     * @return bool
     */
    public function index(User $user)
    {
        return $user->hasRole(['teacher', 'ta']);
    }

    /**
     * Check the user has store permission.
     *
     * @param User $user
     *
     * @return bool
     */
    public function store(User $user)
    {
        return $user->hasRole(['teacher', 'ta']);
    }

    /**
     * Check the user has update permission.
     *
     * @param User $user
     *
     * @return bool
     */
    public function update(User $user)
    {
        return $user->hasRole(['teacher']);
    }

    /**
     * Check the user has search permission.
     *
     * @param User $user
     *
     * @return bool
     */
    public function search(User $user)
    {
        return $user->hasRole(['teacher', 'ta']);
    }
}
