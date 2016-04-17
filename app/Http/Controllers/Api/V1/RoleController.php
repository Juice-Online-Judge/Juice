<?php

namespace App\Http\Controllers\Api\V1;

use App\Accounts\Role;

class RoleController extends ApiController
{
    /**
     * Get all roles info.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $role = Role::all();

        return $this->setData($role)->responseOk();
    }
}
