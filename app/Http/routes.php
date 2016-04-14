<?php

use Illuminate\Routing\Router;

/* @var Router $router */
Auth::loginUsingId(1);
$router->group(['prefix' => 'api', 'namespace' => 'Api'], function (Router $router) {
    $router->group(['prefix' => 'v1', 'namespace' => 'V1'], function (Router $router) {
        $router->group(['middleware' => ['web']], function (Router $router) {
            $router->group(['prefix' => 'auth'], function (Router $router) {
                $router->post('sign-in', 'AuthController@signIn');
                $router->get('sign-out', 'AuthController@signOut');
                $router->post('sign-up', 'AuthController@signUp');
            });

            $router->group(['prefix' => 'account'], function (Router $router) {
                $router->get('profile', 'AccountController@profile');
                $router->get('submissions', 'AccountController@submissions')->middleware(['auth']);
            });

            $router->group(['prefix' => 'questions'], function (Router $router) {
                $router->get('/', 'QuestionController@index');
                $router->post('/', 'QuestionController@store')->middleware(['auth']);
                $router->get('{uuid}', 'QuestionController@show');
            });

            $router->group(['prefix' => 'submissions', 'middleware' => ['auth']], function (Router $router) {
                $router->post('{uuid}', 'SubmissionController@storeUsingWeb');
                $router->get('{id}', 'SubmissionController@show');
                $router->get('{id}/code', 'SubmissionController@code');
            });

            $router->get('exams/{id}/token', 'ExamController@token');
            $router->resource('exams', 'ExamController', ['except' => ['create', 'edit']]);

            $router->resource('configs', 'ConfigController', ['only' => ['index', 'show', 'update']]);
            $router->resource('tags', 'TagController', ['except' => ['create', 'edit']]);
        });

        // JWT base api.
        $router->group(['prefix' => 'jwt'], function (Router $router) {
            $router->post('submissions/{uuid}', 'SubmissionController@storeUsingTurnIn');
        });
    });
});

$router->get('{redirect}', ['as' => 'home', 'uses' => 'HomeController@home'])->where('redirect', '.*')->middleware(['web']);
