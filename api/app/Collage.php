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

    /**
     * Get the user that owns the collage.
     */
    public function user() 
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get the photos owned by the collage.
     */
    public function photos() 
    {
        return $this->hasMany('App\CollagePhoto');
    }

    /**
     * Get upload directory path
     *
     * @return string
     */
    public function getUploadDir()
    {
        return "collages/{$this->id}";
    }

    public function getPhotoUrl()
    {
        return ($this->upload_path) ? \Storage::url($this->upload_path) : '';
    }
}
