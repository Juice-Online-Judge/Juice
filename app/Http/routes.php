<?php

use Dingo\Api\Routing\Router as ApiRouter;
use Illuminate\Routing\Router;

/* @var Router $router */

$api = app('Dingo\Api\Routing\Router');

$api->group(['version' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function (ApiRouter $api) {
    $api->group(['prefix' => 'auth'], function (ApiRouter $api) {
        $api->post('sign-in', 'AuthController@signIn');
        $api->get('sign-out', 'AuthController@signOut');
        $api->post('sign-up', 'AuthController@signUp');
    });

    $api->group(['prefix' => 'account'], function (ApiRouter $api) {
        $api->get('profile', 'AccountController@profile');
        $api->get('submissions', 'AccountController@submissions');
    });

    $api->group(['prefix' => 'questions'], function (ApiRouter $api) {
        $api->get('/', 'QuestionController@index');
        $api->post('/', 'QuestionController@store')->middleware(['api.auth']);
        $api->get('{uuid}', 'QuestionController@show');
    });

    $api->group(['prefix' => 'configs'], function (ApiRouter $api) {
        $api->get('/', 'ConfigController@index')->middleware(['role:admin']);
        $api->get('{key}', 'ConfigController@show');
        $api->patch('{key}', 'ConfigController@update')->middleware(['role:admin']);
    });

    $api->get('users', 'UserController@index')->middleware(['role:admin']);
    $api->get('roles', 'RoleController@index')->middleware(['role:admin']);

    $api->resource('tags', 'TagController', ['except' => ['create', 'edit']]);
});

$router->get('oauth/{driver}', 'Api\V1\OAuthController@oauthRedirect');
$router->get('oauth/{driver}/callback', 'Api\V1\OAuthController@oauthCallback');

$router->group(['prefix' => 'api', 'namespace' => 'Api'], function (Router $router) {
    $router->group(['prefix' => 'v1', 'namespace' => 'V1'], function (Router $router) {
        $router->group(['prefix' => 'submissions'], function (Router $router) {
            $router->group(['middleware' => ['auth']], function (Router $router) {
                $router->get('recent', 'SubmissionController@recent');
                $router->post('{uuid}', 'SubmissionController@storeUsingWeb');
                $router->get('{id}', 'SubmissionController@show');
                $router->patch('{id}', 'SubmissionController@update');
                $router->get('{id}/code', 'SubmissionController@code');
            });

            $router->post('{uuid}/cli', 'SubmissionController@storeUsingCli');
        });

        $router->group(['prefix' => 'exams/{exams}'], function (Router $router) {
            $router->get('questions', 'ExamController@questions');
            $router->get('submissions', 'ExamController@submissions');
            $router->get('scores', 'ExamController@scores');
            $router->get('token', 'ExamController@token');
        });
        $router->resource('exams', 'ExamController', ['except' => ['create', 'edit']]);
    });
});

$router->get('{redirect?}', ['as' => 'home', 'uses' => 'HomeController@home'])->where('redirect', '.*');
