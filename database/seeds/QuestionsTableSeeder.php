<?php

use App\Questions\Question;
use App\Tags\Tag;
use Illuminate\Database\Seeder;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = Tag::all();

        factory(Question::class, mt_rand(30, 50))->create()->each(function (Question $question) use ($tags) {
            $collection = $tags->random(mt_rand(1, 5));

            if ($collection instanceof \Illuminate\Database\Eloquent\Collection) {
                $question->tags()->sync($collection);
            } else {
                $question->tags()->sync([$collection->getAttribute('id')]);
            }
        });
    }
}
