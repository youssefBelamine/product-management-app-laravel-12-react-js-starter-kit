<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = file_get_contents(database_path('json/products.json'));
        $products = json_decode($json, true);
        // Insert each record into database
        foreach ($products as $product) {
            Product::create([
                'name' => $product['name'],
                'price' => $product['price'],
                'stock' => $product['stock'],
                'description' => $product['description'],
                'image_url' => $product['image_url'],
            ]);
        }
    }
}
