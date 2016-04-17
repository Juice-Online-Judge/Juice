<?php

namespace App\Http\Controllers\Api\V1;

use App\Accounts\User;
use App\Http\Requests\Api\V1\SignUpRequest;
use Auth;
use Illuminate\Http\Request;
use JWTAuth;

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
        $token = JWTAuth::attempt($request->only(['username', 'password']));

        if (! $token) {
            return $this->setMessages(['These credentials do not match our records.'])
                ->responseUnprocessableEntity();
        }

        return $this->setData($token)->responseOk();
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
     * @param SignUpRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function signUp(SignUpRequest $request)
    {
        $user = new User($request->only(['username', 'nickname', 'email']));

        $user->setAttribute('password', bcrypt($request->input('password')));

        if (! $user->save()) {
            return $this->responseUnknownError();
        }

        return $this->setData($user->fresh())->responseCreated();
    }
}
