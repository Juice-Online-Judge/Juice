<?php

namespace App\Http\Requests\Api\V1\Account;

use App\Http\Requests\Request;

class PasswordUpdateRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'old_password' => 'required|string|min:6',
            'new_password' => 'required|string|min:6|different:old_password|confirmed',
        ];
    }
}
