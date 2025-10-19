<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => ucfirst(fake()->words(2, true)), // example: "Fresh Apples"
            'price' => fake()->randomFloat(2, 10, 500), // between 10.00 and 500.00
            'description' => fake()->paragraph(), // random text
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
