<?php

namespace App\Http\Requests\Api\V1;

use App\Http\Requests\Request;

class ConfigRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'value'  => 'required',
            'public' => 'required|boolean',
        ];
    }
}
