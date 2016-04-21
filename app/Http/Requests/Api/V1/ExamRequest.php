<?php

namespace App\Http\Requests\Api\V1;

use App\Http\Requests\Request;

class ExamRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'role_id'          => 'sometimes|required|integer|exists:roles,id',
            'name'             => 'required|string|max:48',
            'began_at'         => 'required|date',
            'ended_at'         => 'required|date',
            'question'         => 'required|array',
            'question.*'       => 'required|array|exists:questions,idg',
            'question.*.info'  => 'bail|required|json|max:1000|exam_question_info',
            'user'             => 'required|array',
            'user.*'           => 'required|integer|exists:users,id',
        ];
    }
}
