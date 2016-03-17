<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1;
use App\Entities\User\User;
use Auth;
use Illuminate\Http\Request;

class AuthController extends ApiController
{
    /**
     * User sign in.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function signIn(Request $request)
    {
        if (! Auth::attempt($request->only(['username', 'password']))) {
            return $this->setMessages(['failed' => 'These credentials do not match our records.'])->responseUnprocessableEntity();
        }

        return $this->responseOk();
    }

    /**
     * User sign out.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function signOut()
    {
        Auth::logout();

        return $this->responseOk();
    }

    /**
     * User sign up.
     *
     * @param V1\SignUpRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function signUp(V1\SignUpRequest $request)
    {
        $user = new User($request->only(['username', 'nickname', 'email']));

        $user->setAttribute('password', bcrypt($request->input('password')));

        if (! $user->save()) {
            return $this->responseUnknownError();
        }

        return $this->setData($user->fresh())->responseCreated();
    }
}
