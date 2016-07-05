<?php

namespace App\Policies\Api\V1;

use App\Accounts\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class QuestionPolicy
{
    use HandlesAuthorization;

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
}
