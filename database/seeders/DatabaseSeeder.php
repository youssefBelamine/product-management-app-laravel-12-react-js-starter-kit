<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::firstOrCreate(
        //     ['email' => 'youssefbelamine23@gmail.com'],
        //     [
        //         'name' => 'youssef',
        //         'password' => Hash::make('ysfbl23dev@'),
        //         'email_verified_at' => now(),
        //     ]
        // );
        $this->call([
            ProductSeeder::class,
        ]);

    }
}
