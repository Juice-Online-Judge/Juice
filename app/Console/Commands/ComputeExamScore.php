<?php

namespace App\Console\Commands;

use App\Submissions\Submission;
use DB;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\JoinClause;

class ComputeExamScore extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'exam:compute-score';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Compute the exam score.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $submissions = Submission::with(['judge'])
            ->whereNotNull('submissions.exam_id')
            ->whereHas('judge', function (Builder $query) {
                $query->whereNull('judges.score');
            })
            ->leftJoin('exam_question', function (JoinClause $join) {
                $join->on('submissions.exam_id', '=', 'exam_question.exam_id')
                    ->on('submissions.question_id', '=', 'exam_question.question_id');
            })
            ->get(['submissions.*', 'exam_question.info']);

        $needUpdates = [];

        foreach ($submissions as $submission) {
            $info = json_decode($submission->getAttribute('info'), true);

            if (! isset($info['code_review']) || ! $info['code_review']) {
                $judge = $submission->getRelation('judge');

                $judge->update([
                    'score' => $info['score'] * $judge->getAttribute('correctness') / 100,
                ]);

                $needUpdates[$submission->getAttribute('exam_id')][] = $submission->getAttribute('user_id');
            }
        }

        foreach ($needUpdates as $examId => $userIds) {
            foreach ($userIds as $userId) {
                $scores = Submission::where('submissions.user_id', $userId)
                    ->where('submissions.exam_id', $examId)
                    ->leftJoin('judges', function (JoinClause $join) {
                        $join->on('submissions.id', '=', 'judges.submission_id')
                            ->whereNotNull('judges.score');
                    })
                    ->groupBy(['submissions.question_id'])
                    ->get([
                        'submissions.id',
                        'submissions.user_id',
                        'submissions.question_id',
                        'submissions.exam_id',
                        'judges.submission_id',
                        'judges.score',
                        DB::raw('max(`judges`.`score`) as `high`'),
                    ]);

                DB::table('exam_user')
                    ->where('exam_id', $examId)
                    ->where('user_id', $userId)
                    ->update(['score' => $scores->sum('high')]);
            }
        }
    }
}
