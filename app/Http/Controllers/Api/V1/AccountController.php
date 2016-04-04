<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;

class AccountController extends ApiController
{
    /**
     * Get user profile.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile(Request $request)
    {
        $user = $request->user();

        if (is_null($user)) {
            return $this->setMessages(['Unauthorized'])->responseUnauthorized();
        }

        pluck_relation_field($user, 'roles', 'name');

        return $this->setData($user)->responseOk();
    }

    /**
     * Get user submission records.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function submissions(Request $request)
    {
        $submissions = $request->user()
            ->load(['submissions', 'submissions.question'])
            ->getRelation('submissions');

        return $this->setData($submissions)->responseOk();
    }
}
