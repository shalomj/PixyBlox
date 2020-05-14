<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CollagePhoto extends Model
{
    /**
     * @param array
     */
    protected $fillable = [
        'filename', 
        'config', 
    ];

    /**
     * Get the collage that owns the collage photo.
     */
    public function collage() 
    {
        return $this->belongsTo('App\Collage');
    }

    /**
     * Get the user that owns the collage photo.
     */
    public function user() 
    {
        return $this->belongsTo('App\User');
    }
}
