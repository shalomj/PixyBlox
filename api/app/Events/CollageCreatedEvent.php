<?php

namespace App\Events;

use App\Collage;
use Illuminate\Queue\SerializesModels;

class CollageCreatedEvent 
{
    use SerializesModels;

    /**
     * @var \App\Collage
     */
    public $collage;

    /**
     * Create a new event instance.
     *
     * @param \App\Collage $collage
     */
    public function __construct(Collage $collage)
    {
        $this->collage = $collage;
    }
}
