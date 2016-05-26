<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('password', 100)->nullable()->change();
            $table->string('email', 48)->nullable()->change();

            $table->dropUnique(['nickname']);

            $table->dropRememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('password', 100)->nullable(false)->change();
            $table->string('email', 48)->nullable(false)->change();

            $table->unique('nickname');

            $table->rememberToken()->after('email')->index();
        });
    }
}
