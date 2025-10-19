<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $products = Product::all();
        return Inertia::render("Products/Index", compact("products"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Products/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',           // Name is required, must be a string, max 255 chars
            'price' => 'required|numeric|min:0',           // Price is required, must be numeric, minimum 0
            'description' => 'nullable|string',            // Description is optional, must be string if provided
        ]);

        Product::create($request->all());
        return redirect()->route("products.index")->with("message", "Product created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
