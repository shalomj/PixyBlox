<?php 

namespace App\Services;

use App\Collage;
use App\CollagePhoto;
use App\Exceptions\CollageNotCreatedException;
use App\Exceptions\NoUploadedPhotoException;

class CollageService
{
    /**
     * @var \App\Services\CollagePhotoService
     */
    private $collagePhotoService;

    /**
     * CollageService constructor.
     *
     * @param CollagePhotoService $collagePhotoService
     */
    public function __construct(CollagePhotoService $collagePhotoService)
    {
        $this->collagePhotoService = $collagePhotoService;
    }

    /**
     * Create a collage including uploaded photos
     *
     * @param $data
     *
     * @return Collage|null
     * @throws CollageNotCreatedException
     * @throws NoUploadedPhotoException
     */
    public function storeOrFail($data): ?Collage
    {
        if (empty($data['photos'])) {
            throw new NoUploadedPhotoException('No photo(s) uploaded.');
        }

        $collage = new Collage();

        $collage->user_id = 1;
        $collage->title = $data['title'];
        $collage->description = $data['description'];
        $collage->layout = $data['layout'];
        $collage->filename = '';
        $collage->extension = '';

        if (!$collage->save()) {
            throw new CollageNotCreatedException('Unable to create collage. Please try again later');
        }

        $photos = [];

        foreach ($data['photos'] as $photo) {
            $photos[] = $this->collagePhotoService->createNew($photo['file'], $photo['config']);
        }

        $collage->photos()->saveMany($photos);

        return $collage;
    }

    /**
     * @param $photo
     *
     * @return \Illuminate\Http\UploadedFile
     */
    public function getUploadedFile($photo)
    {
        return $photo['file'];
    }
}