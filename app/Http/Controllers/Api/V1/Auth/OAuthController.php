<?php

namespace App\Http\Controllers\Api\V1\Auth;

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
        $this->exist($driver);

        return Socialite::driver($driver)
            ->stateless()
            ->redirect();
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
        $this->exist($driver);

        try {
            $token = $this->store(
                Socialite::driver($driver)->stateless()->user(),
                $driver
            );

            $redirect = (false === $token)
                ? '/sign-up?oauth=server-error'
                : '/sign-in?oauth='.$token;
        } catch (\Exception $e) {
            $redirect = '/sign-up?oauth=failed';
        }

        return Redirect::route('home', compact('redirect'));
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
    protected function exist($driver)
    {
        $drivers = ['facebook', 'github', 'google'];

        if (! in_array($driver, $drivers, true)) {
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
    protected function store($user, $driver)
    {
        $model = User::updateOrCreate([
            'username' => $driver.'-'.$user->getId(),
        ], [
            'nickname' => $user->getName() ?: $user->getNickname(),
            'email' => $user->getEmail(),
        ]);

        if (! $model->exists) {
            return false;
        }

        return JWTAuth::fromUser($model);
    }
}
