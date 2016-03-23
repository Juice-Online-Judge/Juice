<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->string('uuid', 36)->after('id')->unique();
            $table->unsignedInteger('user_id')->after('uuid')->index();
            $table->string('judge', 1500)->after('description');

            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade');

            $table->dropColumn('test_data');
            $table->dropColumn('restriction');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->string('test_data', 1500)->after('description');
            $table->string('restriction', 1500)->after('test_data');

            $table->dropForeign(['user_id']);

            $table->dropColumn('uuid');
            $table->dropColumn('user_id');
            $table->dropColumn('judge');
        });
    }
}
