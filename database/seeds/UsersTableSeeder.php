<?php

use App\Accounts\Role;
use App\Accounts\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = Role::all();

        if (app()->environment('local') && ! User::where('username', 'test')->exists()) {
            factory(User::class)->create([
                'username' => 'test',
                'password' => bcrypt('test'),
            ])->roles()->sync($roles);
        }

        factory(User::class, mt_rand(25, 35))->create()->each(function (User $user) use ($roles) {
            $collection = $roles->random(mt_rand(1, 3));

            if ($collection instanceof \Illuminate\Database\Eloquent\Collection) {
                $user->roles()->sync($collection);
            } else {
                $user->roles()->sync([$collection->getAttribute('id')]);
            }
        });
    }
}
