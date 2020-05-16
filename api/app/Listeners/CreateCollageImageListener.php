<?php 

namespace App\Listeners;

use App\Events\CollageCreatedEvent;
use App\PixyBlox\PixyBlox;

class CreateCollageImageListener 
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {

    }

    /** 
     * Handle the event.
     * 
     * @param \App\Events\CollageCreatedEvent $event
     * @return void
     */
    public function handle(CollageCreatedEvent $event) 
    {
        $collage = $event->collage;

        // Get all uploaded photos for the collage
        $collagePhotos = $collage->photos;

        // Initialize PixyBlox collage maker
        $pixyBlox = new PixyBlox(
            $collage->layout, 500, 500, $collagePhotos->toArray()
        );

        // Generate collage
        $image = $pixyBlox->make();

        // Upload generated collage to storage
        $collagePath = $collage->getUploadDir();
        $filename = $collage->id . '_' . time() . '.jpg';

        $savePath = storage_path("app/public/{$collagePath}/{$filename}");

        if ($image->save($savePath, 100, 'jpg')) {
            // Update collage file path
            $collage->file_path = "{$collagePath}/{$filename}";

            $collage->save();
        }
    }
}
