<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Categories::factory(20)->create();
        $faker = Faker::create();

        for ($i = 0; $i < 20; $i++) {
            Category::create([
                'name' => $faker->unique()->word,
            ]);
        }
    }
}
