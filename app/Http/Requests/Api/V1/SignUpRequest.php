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
            'username' => 'required|string|max:5|max:24|unique:users',
            'password' => 'required|string|min:6',
            'nickname' => 'required|string|min:5|max:16|unique:users',
            'email'    => 'required|string|email|max:48|unique:users',
        ];
    }
}
