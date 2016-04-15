<?php

namespace App\Validators;

use App\Configs\Config;
use Illuminate\Validation\Validator;

class SupportedLanguageValidator
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
        $lang = Config::find('available-languages');

        return in_array($value, $lang->getAttribute('value'), true);
    }
}
