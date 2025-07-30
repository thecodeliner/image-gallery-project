<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;


class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $galleries = DB::table('gallery')
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($gallery) {
            $gallery->images = DB::table('images')
                ->where('gallery_id', $gallery->id)
                ->get();
            return $gallery;
        });

    // Pass to the view
    return view('index', compact('galleries'));

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('create'); // Assuming you have a create.blade.php in resources/views
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'images' => 'required',
            'images.*' => 'image',
            'thumbnail_index' => 'required|integer',
        ]);

        $images = $request->file('images');
        $thumbnailIndex = (int) $request->input('thumbnail_index');
        $thumbnailPath = null;

        // Store images and identify thumbnail
$storedImagePaths = [];

foreach ($images as $index => $image) {
    $filename = uniqid() . '.' . $image->getClientOriginalExtension();

    // Move image to public/gallery_images
    $image->move(public_path('gallery_images'), $filename);

    $imagePath = 'gallery_images/' . $filename; // relative path for asset()

    if ($index === $thumbnailIndex) {
        $thumbnailPath = $imagePath;
    }

    $storedImagePaths[] = $imagePath;
}

        // Insert gallery and get ID
        $galleryId = DB::table('gallery')->insertGetId([
            'name' => $request->name,
            'thumbnail' => $thumbnailPath,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Save all images
        foreach ($storedImagePaths as $path) {
            DB::table('images')->insert([
                'gallery_id' => $galleryId,
                'image_path' => $path,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return redirect()->back()->with('success', 'Gallery created successfully!');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


}
