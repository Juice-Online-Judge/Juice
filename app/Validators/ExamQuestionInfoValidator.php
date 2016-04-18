<?php

namespace App\Validators;

use Illuminate\Validation\Validator;

class ExamQuestionInfoValidator
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
        $input = json_decode($value, true);

        if (! $input) {
            return false;
        } elseif (! isset($input['score']) || ! is_float($input['score']) || ! ($input['score'] > 0.0 && $input['score'] <= 100.0)) {
            return false;
        } elseif (! array_key_exists('type', $input) || ! in_array($input['type'], [null, 'proportion', 'portion'])) {
            return false;
        } elseif ((is_null($input['type']) || 'proportion' === $input['type']) && 2 !== count($input)) {
            return false;
        } elseif (! ('portion' === $input['type'] && isset($input['goal']) && isset($input['reward']))) {
            return false;
        } elseif (! is_int($input['goal']) || ! number_between($input['goal'], 0, 100, false)) {
            return false;
        } elseif (! is_int($input['reward']) || ! number_between($input['reward'], 0, 100, false)) {
            return false;
        }

        return true;
    }
}
