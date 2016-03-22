<?php

use Illuminate\Routing\Router;

/* @var Router $router */

$router->group(['middleware' => ['web']], function (Router $router) {
    $router->group(['prefix' => 'api', 'namespace' => 'Api'], function (Router $router) {
        $router->group(['prefix' => 'v1', 'namespace' => 'V1'], function (Router $router) {
            $router->group(['prefix' => 'auth', 'middleware' => ['throttle:5,1']], function (Router $router) {
                $router->post('sign-in', 'AuthController@signIn');
                $router->get('sign-out', 'AuthController@signOut');
                $router->post('sign-up', 'AuthController@signUp');
            });

            $router->group(['prefix' => 'questions', 'middleware' => ['auth']], function (Router $router) {
                $router->post('/', 'QuestionController@store');
                $router->get('{id}', 'QuestionController@show');
            });

            $router->group(['prefix' => 'submissions', 'middleware' => ['auth']], function (Router $router) {
                $router->post('/', 'SubmissionController@store');
                $router->get('{id}', 'SubmissionController@show');
            });
        });
    });

    $router->get('{redirect}', ['as' => 'home', 'uses' => 'HomeController@home'])->where('redirect', '.*');
});
