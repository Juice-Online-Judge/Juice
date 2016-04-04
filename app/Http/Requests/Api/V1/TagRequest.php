<?php

namespace App\Http\Requests\Api\V1;

use App\Http\Requests\Request;

class TagRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name' => 'required|string|max:24|unique:tags,name',
            'type' => 'string|max:24',
        ];

        if ($this->isMethod('PATCH')) {
            $rules['name'] .= ','.$this->query('tags');
        }

        return $rules;
    }
}
