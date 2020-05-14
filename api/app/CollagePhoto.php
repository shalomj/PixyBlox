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
}
