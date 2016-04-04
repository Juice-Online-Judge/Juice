<?php

use App\Configs\Config;
use Illuminate\Database\Seeder;

class ConfigsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $configs = [
            'available-languages' => ['c', 'c++'],
        ];

        foreach ($configs as $key => $value) {
            Config::firstOrCreate([
                'key'   => $key,
                'value' => $value,
            ]);
        }
    }
}
