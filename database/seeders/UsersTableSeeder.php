<?php

namespace Database\Seeders;

use Database\Factories\RoleFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        \App\Models\User::factory(10)->create()
            ->each(function ($user) {
                $user->role()->save((new \Database\Factories\RoleFactory)->make());
            });


    }
}
