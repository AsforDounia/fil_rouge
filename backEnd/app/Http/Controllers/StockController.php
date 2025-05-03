<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stocks = Stock::where('centre_id',auth()->id())->get();
        return response()->json([
            'success' => true,
            'stocks' => $stocks
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'groupSanguin' => 'required|string|max:10',
            'composantSanguin' => 'required|string|max:50',
            'quantite' => 'required|integer|min:1',
        ]);

        $serchStock = Stock::where('groupSanguin', $validated['groupSanguin'])->where('composantSanguin' , $validated['composantSanguin'])->first();
        if($serchStock){
            $serchStock->quantite += $validated['quantite'];
            $serchStock->save();
            return response()->json([
                'success'=> true,
                'message' => 'Stock modifier avec succès',
                'stock' => $serchStock
            ], 201);
        }

        $stock = Stock::create([
            'groupSanguin' => $validated['groupSanguin'],
            'composantSanguin' => $validated['composantSanguin'],
            'quantite' => $validated['quantite'],
            'centre_id' => auth()->id(),
        ]);

        return response()->json([
            'success'=> true,
            'message' => 'Stock ajouté avec succès',
            'stock' => $stock
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Stock $stock)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'groupSanguin' => 'sometimes|string|max:10',
            'composantSanguin' => 'sometimes|string|max:50',
            'quantite' => 'sometimes|integer|min:1',
        ]);

        $stock = Stock::findOrFail($id);
        if(!$stock){
            return response()->json([
                'success' => false,
                'message' => 'Stock non trouvee',
            ]);
        }

        $stock->update($validated);


        return response()->json([
            'success' => true,
            'message' => 'Stock mis à jour avec succès',
            'stock' => $stock
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $stock = Stock::findOrFail($id);
        if(!$stock){
            return response()->json([
                'success' => false,
                'message' => 'Stock non trouvee',
            ]);
        }
        $stock->delete();
        return response()->json([
            'success' => true,
            'message' => 'Stock supprimé avec succès'
        ]);
    }
}
