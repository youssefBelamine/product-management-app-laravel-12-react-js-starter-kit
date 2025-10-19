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
    // dd($request->all());
    $data = $request->validate([
        'name' => 'required|string|max:255',        // required, max 255 chars
        'price' => 'required|numeric|min:0',        // required, numeric
        'description' => 'nullable|string',         // optional string
        'stock' => 'required|integer|min:0',        // required, integer >= 0
        'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048', // optional image
    ]);
    // ✅ Handle image upload (if provided)
    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('products', 'public'); // saved in storage/app/public/products
        $data['image_url'] = '/storage/' . $path; // accessible via public/storage
    }

    // ✅ Create product with validated data
    Product::create([
        'name' => $data["name"],       
        'price' => $data["price"],       
        'description' => $data["description"],    
        'stock' => $data["stock"],       
        'image_url' => $data["image_url"],
    ]);

    return redirect()
        ->route('products.index')
        ->with('message', 'Product created successfully!');
}


    /**
     * Display the specified resource.
     */
    public function show(Product $product) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render("Products/Edit", compact("product"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
{
    // dd($request->all());
    // dd($product);
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'stock' => 'integer|min:0',
        'description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
    ]);

    // Handle image upload if exists
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('products', 'public');
        $validatedData['image_url'] = '/storage/' . $imagePath;

        // Optionally delete old image
        if ($product->image_url && file_exists(public_path($product->image_url))) {
            unlink(public_path($product->image_url));
        }
    }

    $product->update($validatedData);

    return redirect()->route("products.index")->with("message", "Product updated successfully.");
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // dd($id);
        $product = Product::findOrFail($id);
        $product->delete();
        return redirect()->back()->with("message", "Product deleted successfully.");
    }
}
