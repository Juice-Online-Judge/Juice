<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AccountController extends ApiController
{
    /**
     * Get user profile.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile()
    {
        $user = request_user();

        if (is_null($user)) {
            return $this->setMessages(['Unauthorized'])->responseUnauthorized();
        }

        pluck_relation_field($user->load(['roles']), 'roles', 'name');

        return $this->setData($user)->responseOk();
    }

    /**
     * Get user submission records.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function submissions()
    {
        $submissions = request_user()
            ->load([
                'submissions' => function (HasMany $query) {
                    $query->getBaseQuery()->whereNull('exam_id');
                },
                'submissions.question' => function (BelongsTo $query) {
                    $query->getBaseQuery()->select(['id', 'uuid', 'title']);
                },
            ])
            ->getRelation('submissions');

        return $this->setData($submissions)->responseOk();
    }
}
