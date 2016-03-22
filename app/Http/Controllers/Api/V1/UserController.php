<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;

class UserController extends ApiController
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
            return $this->responseUnauthorized();
        }

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
