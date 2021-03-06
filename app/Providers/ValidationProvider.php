<?php

namespace App\Providers;

use Validator;
use Illuminate\Support\ServiceProvider;

class ValidationProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('in_exam', $this->getExtension('InExamValidator'), 'Invalid exam.');
        Validator::extend('supported_language', $this->getExtension('SupportedLanguageValidator'), 'The language is not support.');
        Validator::extend('exam_question_info', $this->getExtension('ExamQuestionInfoValidator'), 'The info field is invalid.');
    }

    /**
     * Get the extension name.
     *
     * @param string $name
     * @param string $method
     * @return string
     */
    protected function getExtension($name, $method = 'validate')
    {
        return "App\\Validators\\{$name}@{$method}";
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
