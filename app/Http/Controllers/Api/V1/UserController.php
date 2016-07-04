<?php

namespace App\Http\Controllers\Api\V1;

use App\Accounts\User;
use App\Http\Controllers\Api\ApiController;

class UserController extends ApiController
{
    /**
     * Get all users info.
     *
     * @return \Dingo\Api\Http\Response
     */
    public function index()
    {
        return User::all(['id', 'username', 'nickname']);
    }
}
