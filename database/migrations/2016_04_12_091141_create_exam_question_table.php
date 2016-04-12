<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExamQuestionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exam_question', function (Blueprint $table) {
            $table->unsignedInteger('exam_id');
            $table->unsignedInteger('question_id');
            $table->unsignedTinyInteger('score');

            $table->primary(['exam_id', 'question_id']);

            $table->foreign('exam_id')->references('id')->on('exams')->onUpdate('cascade');
            $table->foreign('question_id')->references('id')->on('questions')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('exam_question');
    }
}
