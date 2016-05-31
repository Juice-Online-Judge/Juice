<?php

namespace App\Http\Controllers\Api\V1;

use App\Accounts\User;
use App\Http\Requests\Api\V1\SignUpRequest;
use Illuminate\Http\Request;
use JWTAuth;

class AuthController extends ApiController
{
    /**
     * Sign in to the application.
     *
     * @param Request $request
     * 
     * @return \Dingo\Api\Http\Response
     */
    public function signIn(Request $request)
    {
        $token = JWTAuth::attempt($request->only(['username', 'password']));

        if (! $token) {
            $this->response->error('These credentials do not match our records.', 422);
        }

        return $token;
    }

    /**
     * Sign out from the application.
     *
     * @return \Dingo\Api\Http\Response
     */
    public function signOut()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return $this->response->noContent();
    }

    /**
     * Sign up for the application.
     *
     * @param SignUpRequest $request
     * 
     * @return \Dingo\Api\Http\Response
     */
    public function signUp(SignUpRequest $request)
    {
        $user = new User($request->only(['username', 'nickname', 'email']));

        $user->setAttribute('password', bcrypt($request->input('password')));

        if (! $user->save()) {
            $this->response->errorInternal();
        }

        return $this->response->created(null, JWTAuth::fromUser($user));
    }
}
