<?php

use Illuminate\Routing\Router;

/* @var Router $router */

$router->group(['middleware' => ['web']], function (Router $router) {
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

            $router->group(['prefix' => 'questions'], function (Router $router) {
                $router->get('/', 'QuestionController@index');
                $router->post('/', 'QuestionController@store')->middleware(['auth']);
                $router->get('{uuid}', 'QuestionController@show');
            });

            $router->group(['prefix' => 'submissions', 'middleware' => ['auth']], function (Router $router) {
                $router->post('/', 'SubmissionController@store');
                $router->get('{id}', 'SubmissionController@show');
            });

            $router->resource('tags', 'TagController', ['except' => ['create', 'edit']]);
        });
    });

    $router->get('{redirect}', ['as' => 'home', 'uses' => 'HomeController@home'])->where('redirect', '.*');
});
