<?php

namespace App\Http\Requests\Api\V1;

use App\Http\Requests\Request;

class SignUpRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => 'bail|required|string|between:5,32|alpha_num|unique:users,username',
            'password' => 'required|string|min:6|different:username|confirmed',
            'nickname' => 'required|string|between:3,16',
            'email'    => 'bail|required|string|email|max:48|unique:users,email',
            'g-recaptcha-response' => 'bail|required|recaptcha',
        ];
    }
}
