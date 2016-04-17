<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class VerifyRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $roles = array_reverse(func_get_args());

            array_pop($roles);
            array_pop($roles);


            if (! $user->hasRole($roles)) {
                return response()->json(['messages' => []], 403);
            }

            return $next($request);
        } catch (JWTException $e) {
            return response()->json(['messages' => []], 401);
        }
    }
}
