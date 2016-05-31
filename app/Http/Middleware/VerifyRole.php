<?php

namespace App\Http\Middleware;

use Api;
use Closure;

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
        $roles = array_reverse(func_get_args());

        array_pop($roles);
        array_pop($roles);

        $user = Api::user();

        if (is_null($user)) {
            Api::response()->errorUnauthorized();
        } elseif (! $user->hasRole($roles)) {
            Api::response()->errorForbidden();
        }

        return $next($request);
    }
}
