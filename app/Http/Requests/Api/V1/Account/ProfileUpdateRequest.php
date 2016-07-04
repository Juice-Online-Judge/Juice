<?php

namespace App\Http\Requests\Api\V1\Account;

use Api;
use App\Http\Requests\Request;

class ProfileUpdateRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $key = Api::user()->getKey();
        $name = Api::user()->getKeyName();

        return [
            'nickname' => 'required|string|between:3,16',
            'email'    => "bail|required|string|email|max:48|unique:users,email,{$key},{$name}",
        ];
    }
}
