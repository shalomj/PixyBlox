<?php

namespace App\Services;

use App\CollagePhoto;
use Illuminate\Http\UploadedFile;

class CollagePhotoService
{
    /**
     * Upload photo and create collage photo instance
     *
     * @param array  $photo
     * @param string $uploadDir
     *
     * @return CollagePhoto|bool
     */
    public function uploadAndCreate(array $photo, string $uploadDir)
    {
        $file = $photo['file'];

        // Upload file to the storage
        $path = $file->store($uploadDir);

        if (!$path) return false;

        $collagePhoto = new CollagePhoto;

        $collagePhoto->position = $photo['position'];
        $collagePhoto->file_path = $path;
        $collagePhoto->config = $photo['config'];

        return $collagePhoto;
    }
}
