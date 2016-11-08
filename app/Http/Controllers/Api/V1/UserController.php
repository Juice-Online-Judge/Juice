<?php

namespace App\Http\Controllers\Api\V1;

use App\Accounts\User;
use App\Http\Controllers\Api\ApiController;

class UserController extends ApiController
{
    /**
     * Get all users info.
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function index()
    {
        return User::all(['id', 'username', 'nickname']);
    }
}
