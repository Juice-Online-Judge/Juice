<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Api\V1\Account\PasswordUpdateRequest;
use App\Http\Requests\Api\V1\Account\ProfileUpdateRequest;
use Hash;
use Illuminate\Database\Eloquent\Relations\Relation;

class AccountController extends ApiController
{
    /**
     * Get the user profile.
     *
     * @return \Dingo\Api\Http\Response
     */
    public function profile()
    {
        return $this->user->load(['roles']);
    }

    /**
     * Update the user nickname and email.
     *
     * @param ProfileUpdateRequest $request
     *
     * @return \Dingo\Api\Http\Response
     */
    public function update(ProfileUpdateRequest $request)
    {
        if (! $this->user->update($request->only(['nickname', 'email']))) {
            $this->response->errorInternal();
        }

        return $this->user;
    }

    /**
     * Update the user password.
     *
     * @param PasswordUpdateRequest $request
     *
     * @return \Dingo\Api\Http\Response
     */
    public function password(PasswordUpdateRequest $request)
    {
        if (! Hash::check($request->input('old_password'), $this->user->getAttribute('password'))) {
            $this->response->error('Invalid old password.', 412);
        }

        if (! $this->user->update(['password' => bcrypt($request->input('new_password'))])) {
            $this->response->errorInternal();
        }

        return $this->response->noContent();
    }

    /**
     * Get the user submission records.
     *
     * @return \Dingo\Api\Http\Response
     */
    public function submissions()
    {
        $this->user->load([
            'submissions' => function (Relation $query) {
                $query->getBaseQuery()->whereNull('exam_id')->select(['id', 'user_id', 'question_id', 'language', 'submitted_at']);
            },
            'submissions.question' => function (Relation $query) {
                $query->getBaseQuery()->select(['id', 'uuid', 'title']);
            },
        ]);

        return $this->user->getRelation('submissions');
    }
}
