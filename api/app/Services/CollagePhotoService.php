<?php

namespace App\Services;

use App\CollagePhoto;
use Illuminate\Http\UploadedFile;
use function json_decode;

class CollagePhotoService
{
    /**
     * Create new collage photo model
     *
     * @param UploadedFile $file
     * @param string       $config
     *
     * @return \App\CollagePhoto
     */
    public function createNew(UploadedFile $file, string $config) : CollagePhoto
    {
        $collagePhoto = new CollagePhoto();

        $collagePhoto->user_id = 1; // TODO: Use actual user id once authentication is implemented
        $collagePhoto->filename = $file->getClientOriginalName();
        $collagePhoto->config = json_decode($config);

        return $collagePhoto;
    }
}
