<?php

namespace App\Validators;

use Illuminate\Validation\Validator;

class ExamQuestionInfoValidator
{
    /**
     * The exam question info field.
     *
     * @var null|array
     */
    private $input;

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
        $this->input = $input = json_decode($value, true);

        $validators = [
            'keysExist',
            'validateCodeReview',
            'validateScore',
            'validateType',
            'validateTypeIsPortion',
            'validateReadFrom',
        ];

        if (! $this->input) {
            return false;
        }

        foreach ($validators as $v) {
            if (! $this->$v()) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check all fields are exist.
     *
     * @return bool
     */
    protected function keysExist()
    {
        $keys = ['score', 'code_review', 'type', 'goal', 'reward', 'read_from'];

        foreach ($keys as $key) {
            if (! array_key_exists($key, $this->input)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check the score field is a number and is valid.
     *
     * @return bool
     */
    protected function validateScore()
    {
        if (! is_numeric($this->input['score']) && ! ($this->input['score'] > 0.0 && $this->input['score'] <= 100.0)) {
            return false;
        }

        return true;
    }

    /**
     * Check the code_review field is a boolean value.
     *
     * @return bool
     */
    protected function validateCodeReview()
    {
        return is_bool($this->input['code_review']);
    }

    /**
     * Check the type field is valid.
     *
     * @return bool
     */
    protected function validateType()
    {
        $types = [null, 'proportion', 'portion_num', 'portion_str'];

        return in_array($this->input['type'], $types, true);
    }

    /**
     * Check the goal and reward fields are valid when type is portion.
     *
     * @return bool
     */
    protected function validateTypeIsPortion()
    {
        if (starts_with($this->input['type'], ['portion'])) {
            if (! is_int($this->input['goal']) || ! number_between($this->input['goal'], 0, 100, false)) {
                return false;
            } elseif (! is_int($this->input['reward']) || ! number_between($this->input['reward'], 0, 100, false)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check the input source field.
     *
     * @return bool
     */
    protected function validateReadFrom()
    {
        return in_array($this->input['read_from'], ['stdin', 'file'], true);
    }
}
