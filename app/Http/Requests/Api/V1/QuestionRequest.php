<?php

namespace App\Http\Requests\Api\V1;

use App\Http\Requests\Request;

class QuestionRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'uuid'                  => 'sometimes|required|string|max:36|unique:questions',
            'title'                 => 'required|string|max:96',
            'description'           => 'required|string|max:2000',
//            'test_data'             => 'required|string|max:1200',
            'restriction'           => 'required|array',
            'restriction.time'      => 'required|numeric',
            'restriction.memory'    => 'required|numeric',
            'restriction.file'      => 'required|integer',
            'restriction.library'   => 'array',
            'restriction.library.*' => 'string',
            'public'                => 'required|boolean',
        ];
    }
}
