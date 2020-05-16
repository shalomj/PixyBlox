<?php 

namespace App\Listeners;

use App\Events\CollageCreatedEvent;
use App\PixyBlox\PixyBlox;

class CreateCollageImageListener 
{
    /**
     * Create the event listener.
     * 
     * @return viod
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

        $collagePhotos = $collage->photos;

        $pixyBlox = new PixyBlox(
            $collage->layout, 500, 500, $collagePhotos->toArray()
        );

        $image = $pixyBlox->make();

        $collagePath = $collage->getUploadDir();
        $filename = $collage->id . '_' . time() . '.jpg';

        $savePath = storage_path("app/public/{$collagePath}/{$filename}");

        if ($image->save($savePath, 100, 'jpg')) {
            $collage->upload_path = "{$collagePath}/{$filename}";

            $collage->save();
        }
    }
}
