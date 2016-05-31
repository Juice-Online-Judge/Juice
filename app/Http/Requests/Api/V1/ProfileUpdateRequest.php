<?php

namespace App\Http\Requests\Api\V1;

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
            'nickname' => 'required|string|min:3|max:16',
            'email'    => "required|string|email|max:48|unique:users,email,{$key},{$name}",
        ];
    }
}
