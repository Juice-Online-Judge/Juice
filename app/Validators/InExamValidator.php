<?php

namespace App\Validators;

use Request;
use App\Exams\Exam;
use Illuminate\Validation\Validator;
use Illuminate\Database\Eloquent\Builder;

class InExamValidator
{
    /**
     * Validate a given attribute against a rule.
     *
     * @param string $attribute
     * @param string $value
     * @param array $parameters
     * @param Validator $validator
     * @return bool
     */
    public function validate($attribute, $value, $parameters, Validator $validator)
    {
        return Exam::whereHas('users', function (Builder $query) {
            $query->where('user_id', Request::user()->getAuthIdentifier());
        })->where('id', $value)->exists();
    }
}
