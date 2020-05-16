<?php

namespace App\Services;

use App\CollagePhoto;
use Illuminate\Http\UploadedFile;

class CollagePhotoService
{
    /**
     * Upload photo and create collage photo instance
     *
     * @param UploadedFile $file
     * @param string       $config
     * @param string       $uploadDir
     *
     * @return CollagePhoto|bool
     */
    public function uploadAndCreate(array $photo, string $uploadDir)
    {
        $file = $photo['file'];

        $path = $file->store($uploadDir);

        if (!$path) return false;

        $collagePhoto = new CollagePhoto;

        $collagePhoto->position = $photo['position'];
        $collagePhoto->file_path = $path;
        $collagePhoto->config = $photo['config'];

        return $collagePhoto;
    }
}
