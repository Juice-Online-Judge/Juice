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
            if (is_null(Config::find($key))) {
                Config::create([
                    'key'   => $key,
                    'value' => $value,
                ]);   
            }
        }
    }
}
