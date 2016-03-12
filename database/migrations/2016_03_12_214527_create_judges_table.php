<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJudgesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('judges', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('submission_id')->index();
            $table->string('result', 5);
            $table->string('compiled_info', 190)->nullable();
            $table->decimal('time', 6, 3)->nullable();
            $table->decimal('memory', 6, 3)->nullable();
            $table->unsignedTinyInteger('file')->default(0);
            $table->timestamp('judged_at')->nullable();

            $table->foreign('submission_id')->references('id')->on('submissions')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('judges');
    }
}
