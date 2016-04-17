<?php

use App\Accounts\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::firstOrCreate(['name' => 'admin']);

        factory(Role::class, mt_rand(3, 5))->create();
    }
}
