<?php

use Illuminate\Routing\Router;

/* @var Router $router */

$router->get('/', ['middleware' => 'web', 'uses' => 'HomeController@home']);

$router->group(['prefix' => 'api', 'namespace' => 'Api', 'middleware' => ['web']], function (Router $router) {
    $router->group(['prefix' => 'v1', 'namespace' => 'V1'], function (Router $router) {
        $router->group(['prefix' => 'auth', 'middleware' => ['throttle:5,1']], function (Router $router) {
            $router->get('sign-in', 'AuthController@signIn');
            $router->get('sign-out', 'AuthController@signOut');
            $router->get('sign-up', 'AuthController@signUp');
        });
    });
});
