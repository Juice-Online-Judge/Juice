<?php

use Illuminate\Routing\Router;

/* @var Router $router */

$router->group(['prefix' => 'api', 'namespace' => 'Api'], function (Router $router) {
    $router->group(['prefix' => 'v1', 'namespace' => 'V1'], function (Router $router) {
        $router->group(['prefix' => 'auth'], function (Router $router) {
            $router->post('sign-in', 'AuthController@signIn');
            $router->get('sign-out', 'AuthController@signOut');
            $router->post('sign-up', 'AuthController@signUp');
        });

        $router->group(['prefix' => 'account'], function (Router $router) {
            $router->get('profile', 'AccountController@profile');
            $router->get('submissions', 'AccountController@submissions')->middleware(['auth']);
        });

        $router->get('users', 'UserController@index')->middleware(['role:admin']);
        $router->get('roles', 'RoleController@index')->middleware(['role:admin']);

        $router->group(['prefix' => 'questions'], function (Router $router) {
            $router->get('/', 'QuestionController@index');
            $router->post('/', 'QuestionController@store')->middleware(['auth']);
            $router->get('{uuid}', 'QuestionController@show');
        });

        $router->group(['prefix' => 'submissions'], function (Router $router) {
            $router->group(['middleware' => ['auth']], function (Router $router) {
                $router->get('recent', 'SubmissionController@recent');
                $router->post('{uuid}', 'SubmissionController@storeUsingWeb');
                $router->get('{id}', 'SubmissionController@show');
                $router->get('{id}/code', 'SubmissionController@code');
            });

            $router->post('{uuid}/cli', 'SubmissionController@storeUsingCli');
        });

        $router->group(['prefix' => 'exams/{exams}'], function (Router $router) {
            $router->get('questions', 'ExamController@questions');
            $router->get('submissions', 'ExamController@submissions');
            $router->get('token', 'ExamController@token');
        });
        $router->resource('exams', 'ExamController', ['except' => ['create', 'edit']]);

        $router->resource('configs', 'ConfigController', ['only' => ['index', 'show', 'update']]);

        $router->resource('tags', 'TagController', ['except' => ['create', 'edit']]);
    });
});

$router->get('{redirect}', ['as' => 'home', 'uses' => 'HomeController@home'])->where('redirect', '.*')->middleware(['web']);
