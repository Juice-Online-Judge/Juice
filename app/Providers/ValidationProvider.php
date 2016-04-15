<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Validator;

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
