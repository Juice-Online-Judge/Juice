<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameAndChangeScoreColumnInExamQuestionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('exam_question', function (Blueprint $table) {
            $table->renameColumn('score', 'info');
        });

        Schema::table('exam_question', function (Blueprint $table) {
            $table->string('info', 1000)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('exam_question', function (Blueprint $table) {
            $table->dropColumn('info');
        });

        Schema::table('exam_question', function (Blueprint $table) {
            $table->unsignedTinyInteger('score');
        });
    }
}
