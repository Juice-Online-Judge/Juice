<?php

namespace App\Http\Requests\Api\V1\Jwt;

use App\Http\Requests\Request;

class SubmissionRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'token'    => 'required|string|size:48',
            'language' => 'required|string|supported_language',
            'code'     => 'required|mimes:txt',
        ];
    }
}
