<?php

namespace App\Http\Controllers\Api\V1;

use App\Accounts\User;

class UserController extends ApiController
{
    /**
     * Get all users info.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = User::all(['id', 'username', 'nickname']);

        return $this->setData($users)->responseOk();
    }
}
