<?php

namespace App\Http\Controllers;

use App\Collage;
use App\Http\Requests\StoreCollageRequest;
use App\Services\CollageService;
use Exception;

class CollageController extends Controller
{
    /**
     * @var CollageService
     */
    private $collageService;

    /**
     * CollageController constructor.
     *
     * @param CollageService $collageService
     */
    public function __construct(CollageService $collageService)
    {
        $this->collageService = $collageService;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCollageRequest $request)
    {
        $collage = $this->collageService->storeOrFail($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $collage, 
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Collage  $collage
     * @return \Illuminate\Http\Response
     */
    public function show(Collage $collage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Collage  $collage
     * @return \Illuminate\Http\Response
     */
    public function update(StoreCollageRequest $request, Collage $collage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Collage  $collage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Collage $collage)
    {
        //
    }
}
