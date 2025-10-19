<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    // Route::controller(ProductController::class)->group(function(){
    //     Route::get("/products", "index")->name("products.index");
    //     Route::get("/products/create", "create")->name("products.create");
    //     Route::post("/products/store", "store")->name("products.store");
    //     Route::delete("/products/{id}", "destroy")->name("products.destroy");
    //     Route::get("/products/{product}", "edit")->name("products.edit");
    //     Route::put("/products/{product}", "update")->name("products.update");
    // });
    Route::resource('products', ProductController::class)->except(['show']);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
