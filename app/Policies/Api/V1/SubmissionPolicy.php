<?php

namespace App\Policies\Api\V1;

use App\Accounts\User;
use App\Submissions\Submission;
use Illuminate\Auth\Access\HandlesAuthorization;

class SubmissionPolicy
{
    use HandlesAuthorization;

    public function before(User $user, $ability, Submission $submission)
    {
        if ($user->hasRole(['admin'])) {
            return true;
        }
    }

    /**
     * 確認使用者有權限查詢該筆 submission.
     *
     * @param User $user
     * @param Submission $submission
     * @return bool
     */
    public function show(User $user, Submission $submission)
    {
        return $submission->getAttribute('user_id') === $user->getAuthIdentifier();
    }

    /**
     * 確認是否有更新成績的權限.
     *
     * @param User $user
     * @param Submission $submission
     * @return bool
     */
    public function update(User $user, Submission $submission)
    {
        $exam = $submission->load(['exam'])->getRelation('exam');

        $allow = $exam->getAttribute('user_id') === $user->getAuthIdentifier();

        if ($allow) {
            return true;
        }

        $role = $exam->load(['role'])->getRelation('role');

        if (is_null($role)) {
            return false;
        }

        return $user->hasRole([$role->getAttribute('name')]);
    }

    /**
     * 確認使用者有權限查詢該筆 submission 的 code.
     *
     * @param User $user
     * @param Submission $submission
     * @return bool
     */
    public function code(User $user, Submission $submission)
    {
        return $submission->getAttribute('user_id') === $user->getAuthIdentifier();
    }
}
