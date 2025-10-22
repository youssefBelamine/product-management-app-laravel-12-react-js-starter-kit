<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'price',
        'stock',
        'description',
        'image_url',
    ];

    public function getImageUrlAttribute($value)
{
    // Only replace if value is null
    if (!is_null($value) && $value !== '') {
        return asset($value);
    }

    return asset('storage/default/image_not_found.png');
}


}
