<?php 

namespace App\PixyBlox;

use Intervention\Image\Facades\Image;

class PixyBlox 
{
    /**
     * @var \Intervention\Image\Image
     */
    private $canvas;

    /*
     * @var int Canvas layout
     */
    private $layout;

    /**
     * @var int Width of the canvas
     */
    private $width;

    /**
     * @var int Height of the canvas
     */
    private $height;

    /**
     * @var array Photos to be inserted on the canvas
     */
    private $photos = [];

    private $background = '#ffffff';

    public function __construct($layout, $width, $height, array $photos)
    {
        $this->layout = $layout;
        $this->width = $width;
        $this->height = $height;
        $this->photos = $photos;
    }

    public function make($path = null, $quality = null, $format = null) 
    {
        $this->canvas = Image::canvas($this->width, $this->height, $this->background);

        foreach ($this->photos as $photo) {
            $this->insertToCanvas($photo);
        }

        if ($path) {
            $this->canvas->save($path, $quality, $format);
        }

        return $this->canvas;
    }

    private function insertToCanvas($photo) 
    {
        $position = $photo['position'];
        $path = $photo['upload_path'];
        $crop = json_decode($photo['config'], true);

        $imageFile = Image::make(storage_path('app/public/' . $path));

        $imageFile = $this->crop($imageFile, $crop);
        $imageFile = $this->resizeByLayoutAndPosition($imageFile, $position);

        return $this->insertByLayoutAndPosition($imageFile, $position);
    }

    private function crop($image, $crop) 
    {
        return $image->crop(
            $crop['width'], $crop['height'], $crop['x'], $crop['y']
        );
    }

    private function resizeByLayoutAndPosition($image, $position) 
    {
        // Full single photo
        if ($this->layout == 1) {
            return $image->resize($this->width, $this->height);
        }

        $halfWidth = $this->width / 2;

        // 2 Column layout or Layout 3 for first position
        if ($this->layout == 2 || ($this->layout == 3 && $position == 1)) {
            return $image->resize($halfWidth, $this->height);
        }

        $halfHeight = $this->height / 2;

        // Layout 3
        // Half size
        return $image->resize($halfWidth, $halfHeight);
    }

    private function insertByLayoutAndPosition($image, $position) 
    {
        // Full single photo
        if ($this->layout == 1) {
            return $this->canvas->insert($image);
        }

        $xOffset = ($position == 1) ? 0 : $this->width / 2;

        // 2 Column layout or Layout 3 for first position
        if ($this->layout == 2 || ($this->layout == 3 && $position == 1)) {
            return $this->canvas->insert($image, 'top-left', $xOffset);
        }

        $yOffset = ($position == 2) ? 0 : $this->height / 2;

        // Layout 3
        // Half size
        return $this->canvas->insert($image, 'top-left', $xOffset, $yOffset);
    }
}