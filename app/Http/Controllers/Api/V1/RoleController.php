<?php

namespace App\Http\Controllers\Api\V1;

use App\Accounts\Role;
use App\Http\Controllers\Api\ApiController;

class RoleController extends ApiController
{
    /**
     * Get all roles.
     *
     * @return \Dingo\Api\Http\Response
     */
    public function index()
    {
        return Role::all();
    }
}
