import React, { useRef, useEffect } from 'react';
import Cropper from 'cropperjs';

const ImageCropper = ({ image, layout, position, setCropDetail }) => {
  const img = useRef(null);

  const getCanvasAndCropSize = (layout, position) => {
    const options = {
      width: parseInt(process.env.REACT_APP_COLLAGE_WIDTH), 
      height: parseInt(process.env.REACT_APP_COLLAGE_HEIGHT), 
    };

    if (layout === 1) {
      return options;
    }

    if (layout === 2 || (layout === 3 && position === 1)) {
      options.width = options.width / 2;

      return options;
    }

    options.width = options.width / 2;
    options.height = options.height / 2;

    return options;
  };

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