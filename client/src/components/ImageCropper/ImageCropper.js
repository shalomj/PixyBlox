import React, { useRef, useEffect } from 'react';
import Cropper from 'cropperjs';

/**
 * Component for image cropper for each collage block
 * 
 * @param {String} param0 The source of the image
 * @param {Number} param1 The selected layout
 * @param {Number} param2 The position of the block where the component is rendered
 * @param {Function} param3 Function to call to set the crop detail provided by Cropperjs
 */
const ImageCropper = ({ image, layout, position, setCropDetail }) => {
  const img = useRef(null);

  /**
   * Get the width and height of the crop container
   * based on the selected layout and the block position
   * 
   * @param {Number} layout The selected layout
   * @param {Number} position The position of the block where the component is rendered
   */
  const getCanvasAndCropSize = (layout, position) => {
    const options = {
      width: parseInt(process.env.REACT_APP_COLLAGE_WIDTH), 
      height: parseInt(process.env.REACT_APP_COLLAGE_HEIGHT), 
    };

    // Full single layout
    if (layout === 1) {
      return options;
    }

    // For two column layout or first block of layout 3
    if (layout === 2 || (layout === 3 && position === 1)) {
      options.width = options.width / 2;

      return options;
    }

    // For layout 3 position 2 and 3
    options.width = options.width / 2;
    options.height = options.height / 2;

    return options;
  };

  /**
   * Initialize Cropperjs
   * 
   * @param {HTMLElement} elem The image element
   */
  const initCropper = (elem) => {
    const cropperOpts = getCanvasAndCropSize(layout, position);

    new Cropper(elem, {
      viewMode: 0, 
      dragMode: 'move', 
      responsive: true, 
      modal: false, 
      cropBoxMovable: false, 
      cropBoxResizable: false, 
      ready() {
        this.cropper.setCanvasData(cropperOpts);
        this.cropper.setCropBoxData({
          left: 0,
          ...cropperOpts
        });
      },
      crop(event) {
        const cropDetail = this.cropper.getData(true);

        console.log(cropDetail);

        setCropDetail(cropDetail);
      },
    });
  }

  // Re-initialize Cropperjs when the layout changes
  useEffect(() => {
    const currentImg = img.current;

    initCropper(img.current);

    return () => {
      currentImg.cropper.destroy();
    }
  }, [layout]);
  
  return (
    <div className="w-100 h-100">
      <img src={image} ref={img} className="d-none" style={{maxWidth: '100%'}} alt="One of the tile for collage"/>
    </div>
  )
};

export default ImageCropper;