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
            'uuid'                  => 'bail|sometimes|required|string|max:36|unique:questions,uuid',
            'title'                 => 'required|string|max:96',
            'description'           => 'required|string|max:3500',
            'input'                 => 'required|array',
            'input.textarea'        => 'required_without:input.file|array',
            'input.textarea.*'      => 'required|string',
            'input.file'            => 'required_without:input.textarea|array',
            'input.file.*'          => 'required|mimes:txt',
            'output'                => 'required|array',
            'output.textarea'       => 'required_without:output.file|array',
            'output.textarea.*'     => 'required|string',
            'output.file'           => 'required_without:output.textarea|array',
            'output.file.*'         => 'required|mimes:txt',
            'argument'              => 'array',
            'argument.*'            => 'required|string',
            'restriction'           => 'required|array',
            'restriction.time'      => 'required|numeric|min:1',
            'restriction.memory'    => 'required|numeric|min:5',
            'restriction.file'      => 'required|integer|min:0',
            'restriction.library'   => 'array',
            'restriction.library.*' => 'required|string',
            'public'                => 'required|boolean',
            'tag'                   => 'array',
            'tag.*'                 => 'sometimes|required|integer|exists:tags,id',
        ];
    }
}
