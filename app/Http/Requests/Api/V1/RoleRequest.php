<?php

namespace App\Http\Requests\Api\V1;

use App\Http\Requests\Request;

class RoleRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name'   => ['bail', 'required', 'string', 'max:32', 'regex:/^custom-.+/', 'unique:roles,name'],
            'remark' => 'string|max:190',
        ];

        if ($this->isMethod('PATCH')) {
            $rules[count($rules)-1] .= ','.$this->route('roles').',id';
        }

        return $rules;
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.regex' => 'The role name must begin with "custom-"',
        ];
    }
}
