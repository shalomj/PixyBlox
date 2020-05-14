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
    public function uploadAndCreate(UploadedFile $file, string $config, string $uploadDir)
    {
        $path = $this->upload($file, $uploadDir);

        if (!$path) return false;

        $collagePhoto = new CollagePhoto;

        $collagePhoto->filename = $file->getClientOriginalName();
        $collagePhoto->upload_path = $path;
        $collagePhoto->config = json_decode($config);

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
