<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

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
        $user = $request->user();

        if (is_null($user)) {
            throw new UnauthorizedHttpException('Unauthorized');
        }

        $roles = array_reverse(func_get_args());

        array_pop($roles);
        array_pop($roles);

        if (! $user->hasRole($roles)) {
            throw new AccessDeniedHttpException;
        }

        return $next($request);
    }
}
