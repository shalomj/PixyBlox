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
     * @var int The canvas layout style
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

    /**
     * @var string Default canvas background color
     */
    private $background = '#ffffff';

    /**
     * Create new PixyBlox instance.
     *
     * @param       $layout
     * @param       $width
     * @param       $height
     * @param array $photos
     */
    public function __construct($layout, $width, $height, array $photos)
    {
        $this->layout = $layout;
        $this->width = $width;
        $this->height = $height;
        $this->photos = $photos;
    }

    /**
     * Create a collage from provided photos
     *
     * @param null $path
     * @param null $quality
     * @param null $format
     *
     * @return \Intervention\Image\Image
     */
    public function make($path = null, $quality = null, $format = null) 
    {
        // Create new canvas
        $this->canvas = Image::canvas($this->width, $this->height, $this->background);

        foreach ($this->photos as $photo) {
            $this->insertToCanvas($photo);
        }

        if ($path) {
            $this->canvas->save($path, $quality, $format);
        }

        return $this->canvas;
    }

    /**
     * Crop, resize and then insert photo to the canvas
     *
     * @param array $photo
     *
     * @return \Intervention\Image\Image
     */
    private function insertToCanvas($photo) 
    {
        $position = $photo['position'];
        $path = $photo['file_path'];
        $crop = json_decode($photo['config'], true);

        $imageFile = Image::make(storage_path('app/public/' . $path));

        $imageFile = $this->crop($imageFile, $crop);
        $imageFile = $this->resizeByLayoutAndPosition($imageFile, $position);

        return $this->insertByLayoutAndPosition($imageFile, $position);
    }

    /**
     * Crop image
     *
     * @param \Intervention\Image\Image $image
     * @param array $crop
     *
     * @return \Intervention\Image\Image
     */
    private function crop($image, $crop) 
    {
        return $image->crop(
            $crop['width'], $crop['height'], $crop['x'], $crop['y']
        );
    }

    /**
     * Resize the image based on the layout state and position
     *
     * @param \Intervention\Image\Image $image
     * @param int $position
     *
     * @return \Intervention\Image\Image
     */
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

    /**
     * Insert photo to the canvas based on the layout style and position
     *
     * @param \Intervention\Image\Image $image
     * @param int $position
     *
     * @return \Intervention\Image\Image
     */
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
