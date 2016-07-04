<?php

use Dingo\Api\Routing\Router as ApiRouter;
use Illuminate\Routing\Router;

/* @var Router $router */

$api = app('Dingo\Api\Routing\Router');

$api->group(['version' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function (ApiRouter $api) {
    $api->group(['prefix' => 'auth', 'namespace' => 'Auth'], function (ApiRouter $api) {
        $api->post('sign-in', ['middleware' => 'api.throttle', 'limit' => 5, 'expires' => 1, 'uses' => 'AuthController@signIn']);
        $api->get('sign-out', ['middleware' => 'api.auth', 'uses' => 'AuthController@signOut']);
        $api->post('sign-up', ['uses' => 'AuthController@signUp']);
        $api->get('sign-up/validate', ['uses' => 'SignUpValidateController@verify']);
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

    $api->group(['prefix' => 'submissions'], function (ApiRouter $api) {
        $api->group(['middleware' => ['auth']], function (ApiRouter $api) {
            $api->get('recent', 'SubmissionController@recent');
            $api->post('{uuid}', 'SubmissionController@storeUsingWeb');
            $api->get('{id}', 'SubmissionController@show');
            $api->patch('{id}', 'SubmissionController@update');
            $api->get('{id}/code', 'SubmissionController@code');
        });

        $api->post('{uuid}/cli', 'SubmissionController@storeUsingCli');
    });

    $api->group(['prefix' => 'exams/{exams}', 'middleware' => ['api.auth']], function (ApiRouter $api) {
        $api->get('questions', 'ExamController@questions');
        $api->get('submissions', 'ExamController@submissions');
        $api->get('scores', 'ExamController@scores');
        $api->get('token', 'ExamController@token');
    });
    $api->resource('exams', 'ExamController', ['middleware' => ['api.auth'], 'except' => ['create', 'edit']]);

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

$router->get('{redirect?}', ['as' => 'home', 'uses' => 'HomeController@home'])->where('redirect', '.*');
