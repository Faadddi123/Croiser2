<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriesController extends Controller
{
    public function details(){
        return Inertia::render('categories/manage');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Categories = categories::all();
        return response()->json($Categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, categories $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        
        $category->update(['name' => $request->name]);

        // Send the ID of the updated category as JSON response
        return response()->json(['id' => $category->id]);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = categories::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    }
}
