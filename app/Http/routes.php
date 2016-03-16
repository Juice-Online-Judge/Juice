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
        });
    });

    $router->get('{redirect}', 'HomeController@home')->where('redirect', '.*');
});
