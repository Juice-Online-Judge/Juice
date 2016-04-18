<?php

use App\Accounts\User;
use App\Exams\Exam;
use App\Questions\Question;
use Illuminate\Database\Seeder;

class ExamsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $questions = Question::all();

        $users = User::all();

        factory(Exam::class, mt_rand(20, 30))->create()->each(function (Exam $exam) use ($users, $questions) {
            $q = $questions->random(mt_rand(15, 20));

            foreach ($q->keys() as $key) {
                $joins[$key] = [
                    'info' => json_encode([
                        'score' => mt_rand(15, 20),
                        'type' => \Illuminate\Support\Str::quickRandom(4),
                    ]),
                ];
            }

            $exam->questions()->saveMany($q, $joins);

            $exam->users()->saveMany($users->random(mt_rand(20, 25)));
        });
    }
}
