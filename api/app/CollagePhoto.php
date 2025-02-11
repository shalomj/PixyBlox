<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CollagePhoto extends Model
{
    /**
     * @param array
     */
    protected $fillable = [
        'position',
        'file_path',
        'config', 
    ];

    /**
     * Get the collage that owns the collage photo.
     */
    public function collage() 
    {
        return $this->belongsTo('App\Collage');
    }
}
