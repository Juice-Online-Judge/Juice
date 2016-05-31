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
            'username' => [
                'bail', 'required', 'string', 'regex:/^\w{5,32}$/', 'unique:users,username',
            ],
            'password' => 'required|string|min:6',
            'nickname' => 'required|string|min:3|max:16',
            'email'    => 'required|string|email|max:48|unique:users,email',
        ];
    }
}
