<?php

namespace App\Http\Controllers\Api\V1;

use App\Accounts\User;
use App\Http\Controllers\Controller;
use JWTAuth;
use Redirect;
use Socialite;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class OAuthController extends Controller
{
    /**
     * Redirect the user to the authentication page.
     *
     * @param string $driver
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function oauthRedirect($driver)
    {
        $this->ensureAvailableDriver($driver);

        return Socialite::driver($driver)->stateless()->redirect();
    }

    /**
     * Obtain the user information from oauth.
     *
     * @param string $driver
     *
     * @return Redirect
     */
    public function oauthCallback($driver)
    {
        $this->ensureAvailableDriver($driver);

        try {
            $user = Socialite::driver($driver)->stateless()->user();
        } catch (\Exception $e) {
            return Redirect::route('home', ['redirect' => '/sign-up?oauth=failed']);
        }

        $token = $this->storeUser($user, $driver);

        if (false === $token) {
            return Redirect::route('home', ['redirect' => '/sign-up?oauth=server-error']);
        }

        return Redirect::route('home', ['redirect' => '/?oauth='.$token]);
    }

    /**
     * Check the driver is available.
     *
     * @param string $driver
     *
     * @return void
     *
     * @throws NotFoundHttpException
     */
    protected function ensureAvailableDriver($driver)
    {
        $drivers = ['facebook', 'github'];

        if (! in_array($driver, $drivers)) {
            throw new NotFoundHttpException;
        }
    }

    /**
     * Create the user account and get jwt token.
     *
     * @param \Laravel\Socialite\Contracts\User $user
     * @param string $driver
     *
     * @return bool|string
     */
    protected function storeUser($user, $driver)
    {
        $user = User::create([
            'username' => $driver.'-'.$user->getId(),
            'nickname' => $user->getName(),
            'email' => $user->getEmail(),
        ]);

        if (! $user->exists) {
            return false;
        }

        return JWTAuth::fromUser($user);
    }
}
