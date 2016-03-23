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
            'input'                 => 'required|array',
            'input.textarea'        => 'array',
            'input.textarea.*'      => 'sometimes|required|string',
            'input.file'            => 'array',
            'input.file.*'          => 'sometimes|required|mimes:plain',
            'output'                => 'required|array',
            'output.textarea'       => 'array',
            'output.textarea.*'     => 'sometimes|required|string',
            'output.file'           => 'array',
            'output.file.*'         => 'sometimes|required|mimes:plain',
            'argument'              => 'array',
            'argument.*'            => 'sometimes|required|string',
            'restriction'           => 'required|array',
            'restriction.time'      => 'required|numeric',
            'restriction.memory'    => 'required|numeric',
            'restriction.file'      => 'required|integer',
            'restriction.library'   => 'array',
            'restriction.library.*' => 'sometimes|required|string',
            'public'                => 'required|boolean',
        ];
    }
}
