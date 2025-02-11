<?php 

namespace App\Services;

use App\Collage;
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

        $collage = new Collage([
            'layout' => $data['layout']
        ]);

        if (!$collage->save()) {
            throw new CollageNotCreatedException('Unable to create collage. Please try again later');
        }

        $photos = [];

        foreach ($data['photos'] as $photo) {
            $collagePhoto = $this->collagePhotoService->uploadAndCreate(
                $photo,
                $collage->getUploadDir()
            );

            if ($collagePhoto) {
                $photos[] = $collagePhoto;
            }
        }

        $collage->photos()->saveMany($photos);

        return $collage;
    }
}
