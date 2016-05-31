<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\PasswordUpdateRequest;
use App\Http\Requests\Api\V1\ProfileUpdateRequest;
use Hash;
use Illuminate\Database\Eloquent\Relations\Relation;

class AccountController extends ApiController
{
    /**
     * Get user profile.
     *
     * @return \Dingo\Api\Http\Response
     */
    public function profile()
    {
        if (is_null($this->user)) {
            $this->response->errorUnauthorized();
        }

        return $this->user->load(['roles']);
    }

    /**
     * Update the user nickname and email.
     *
     * @param ProfileUpdateRequest $request
     *
     * @return \Dingo\Api\Http\Response
     */
    public function updateProfile(ProfileUpdateRequest $request)
    {
        $this->user->update($request->only(['nickname', 'email']));

        return $this->user->fresh();
    }

    /**
     * Update the user password.
     *
     * @param PasswordUpdateRequest $request
     *
     * @return \Dingo\Api\Http\Response
     */
    public function updatePassword(PasswordUpdateRequest $request)
    {
        if (! Hash::check($request->input('old_password'), $this->user->getAttribute('password'))) {
            $this->response->error('Invalid old password.', 422);
        }

        $this->user->update([
            'password' => bcrypt($request->input('new_password')),
        ]);

        return $this->user->fresh();
    }

    /**
     * Get the user submission records.
     *
     * @return \Dingo\Api\Http\Response
     */
    public function submissions()
    {
        $submissions = $this->user->load([
            'submissions.question' => function (Relation $query) {
                $query->getBaseQuery()->select(['id', 'uuid', 'title']);
            },
        ])
        ->getRelation('submissions');

        return $submissions;
    }
}
