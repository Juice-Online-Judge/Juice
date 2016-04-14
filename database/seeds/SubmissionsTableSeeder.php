<?php

use App\Judges\Judge;
use App\Submissions\Submission;
use Illuminate\Database\Seeder;

class SubmissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Submission::class, mt_rand(70, 100))->create()->each(function (Submission $submission) {
            $submission->judge()->save(factory(Judge::class)->create([
                'submission_id' => $submission->getAttribute('id'),
            ]));
        });
    }
}
