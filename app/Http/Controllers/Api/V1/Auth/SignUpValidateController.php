<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Api\ApiController;
use Dingo\Api\Exception\ValidationHttpException;
use Illuminate\Http\Request;
use Validator;

class SignUpValidateController extends ApiController
{
    /**
     * Validation rules.
     *
     * @var array
     */
    protected $rules = [
        'username' => 'bail|required|string|between:5,32|alpha_num|unique:users,username',
        'password' => 'bail|required|string|min:6|different:username',
        'nickname' => 'bail|required|string|between:3,16',
        'email'    => 'bail|required|string|email|max:48|unique:users,email',
    ];

    /**
     * Validate the given field is valid or not.
     *
     * @param Request $request
     *
     * @return \Dingo\Api\Http\Response
     */
    public function verify(Request $request)
    {
        if (! array_key_exists($request->input('field'), $this->rules)) {
            $this->response->errorMethodNotAllowed();
        }

        $validator = Validator::make([$request->input('field') => $request->input('value')], [
            $request->input('field') => $this->rules[$request->input('field')],
        ]);

        if ($validator->fails()) {
            throw new ValidationHttpException($validator->errors());
        }

        return $this->response->accepted();
    }
}
