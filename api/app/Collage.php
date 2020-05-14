<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collage extends Model
{
    /**
     * @param array
     */
    protected $fillable = [
        'title', 
        'description', 
        'layout', 
        'filename', 
        'extension', 
    ];
}
