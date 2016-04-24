<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\Exceptions\JWTException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        JWTException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if ($e instanceof \Tymon\JWTAuth\Exceptions\JWTException) {
            return response()->json(['messages' => $e->getMessage()], $e->getStatusCode());
        }

        if ($request->is('api/*') || $request->wantsJson()) {
            switch (true) {
                case $e instanceof AuthorizationException: $status = 403; break;
                case $e instanceof ModelNotFoundException: $status = 404; break;
            }

            if (isset($status)) {
                return response()->json([], $status);
            }
        }

        return parent::render($request, $e);
    }
}
