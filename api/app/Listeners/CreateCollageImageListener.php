<?php 

namespace App\Listeners;

use App\Events\CollageCreatedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateCollageImageListener implements ShouldQueue
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

        // Crop and combine photos here
    }
}
