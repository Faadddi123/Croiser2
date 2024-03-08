<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categories;
// use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Role::create(['name' => 'Utilisateur']);
        // Role::create(['name' => 'Organisateur']);
        // Role::create(['name' => 'Administrateur']);

        // Categories::factory(20)->create();

        $categories = [
            'Business & Professional',
            'Music',
            'Food & Drink',
            'Community & Culture',
            'Performing & Visual Arts',
            'Film, Media & Entertainment',
            'Sports & Fitness',
            'Health & Wellness',
            'Science & Technology',
            'Travel & Outdoor',
            'Charity & Causes',
            'Religion & Spirituality',
            'Family & Education',
            'Seasonal & Holiday',
            'Government & Politics',
            'Fashion & Beauty',
            'Home & Lifestyle',
            'Auto, Boat & Air',
            'Hobbies & Special Interest',
            'Other',
        ];

        foreach ($categories as $categoryName) {
            Categories::create(['name' => $categoryName]);
        }

    }
}
