<?php

namespace App\Http\Requests\Api\V1;

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
            'exam_id'  => 'bail|sometimes|required|integer|in_exam',
            'code'     => 'required',
            'language' => 'required',
        ];
    }
}
