<?php

namespace App\Http\Controllers;

use App\Collage;
use App\Events\CollageCreatedEvent;
use App\Http\Requests\StoreCollageRequest;
use App\Http\Resources\CollageResource;
use App\Services\CollageService;

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
        // Save collage data, upload photos and save crop configs
        $collage = $this->collageService->storeOrFail($request->all());

        // Trigger event to generate collage using PixyBlox photo tile maker
        event(new CollageCreatedEvent($collage));

        return response()->json([
            'status' => 'success',
            'data' => new CollageResource($collage),
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
