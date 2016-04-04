<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyJudgesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('judges', function (Blueprint $table) {
            $table->dropColumn('compiled_info');

            $table->string('judge_message', 5000)->nullable()->after('result');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('judges', function (Blueprint $table) {
            $table->dropColumn('judge_message');

            $table->string('compiled_info', 190)->nullable()->after('result');
        });
    }
}
