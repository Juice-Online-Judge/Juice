<?php

namespace App\Providers;

use App\Exams\Exam;
use App\Accounts\Role;
use App\Questions\Question;
use App\Submissions\Submission;
use App\Policies\Api\V1\ExamPolicy;
use App\Policies\Api\V1\RolePolicy;
use App\Policies\Api\V1\QuestionPolicy;
use App\Policies\Api\V1\SubmissionPolicy;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Exam::class       => ExamPolicy::class,
        Question::class   => QuestionPolicy::class,
        Role::class       => RolePolicy::class,
        Submission::class => SubmissionPolicy::class,
    ];

    /**
     * Register any application authentication / authorization services.
     *
     * @param  \Illuminate\Contracts\Auth\Access\Gate  $gate
     * @return void
     */
    public function boot(GateContract $gate)
    {
        $this->registerPolicies($gate);

        //
    }
}
