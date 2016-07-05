<?php

namespace App\Http\Controllers\Api\V1;

use App\Accounts\Role;
use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Api\V1\RoleRequest;
use Illuminate\Http\Request;

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

    /**
     * Create a new role.
     *
     * @param RoleRequest $request
     *
     * @return \Dingo\Api\Http\Response
     */
    public function store(RoleRequest $request)
    {
        $role = Role::create($request->only(['name', 'remark']));

        if (! $role->exists) {
            $this->response->errorInternal();
        }

        return $role;
    }

    /**
     * Update the specific role.
     *
     * @param RoleRequest $request
     * @param int $id
     *
     * @return \Dingo\Api\Http\Response
     */
    public function update(RoleRequest $request, $id)
    {
        $role = Role::find($id);

        if (is_null($role)) {
            $this->response->errorNotFound();
        } elseif ('admin' === $role->getAttribute('name')) {
            $this->response->errorForbidden();
        } elseif (false === $role->update($request->only(['name', 'remark']))) {
            $this->response->errorInternal();
        }

        return $role;
    }

    /**
     * Search roles using given key.
     *
     * @param Request $request
     *
     * @return \Dingo\Api\Http\Response
     */
    public function search(Request $request)
    {
        return Role::where('name', 'like', 'custom-%'.$request->input('key').'%')->get();
    }
}
