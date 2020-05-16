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

        $path = $this->upload($file, $uploadDir);

        if (!$path) return false;

        $collagePhoto = new CollagePhoto;

        $collagePhoto->position = $photo['position'];
        $collagePhoto->filename = $file->getClientOriginalName();
        $collagePhoto->upload_path = $path;
        $collagePhoto->config = $photo['config'];

        return $collagePhoto;
    }

    /**
     * Upload photo to collage directory
     *
     * @param UploadedFile $file
     * @param string       $uploadDir
     *
     * @return false|string
     */
    public function upload(UploadedFile $file, string $uploadDir)
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        $filename = $originalFilename . '-' . time() . '.' . $file->getClientOriginalExtension();

        return $file->storeAs('public/' . $uploadDir, $filename);
    }
}
