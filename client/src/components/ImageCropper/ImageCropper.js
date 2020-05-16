import React, { useRef, useEffect } from 'react';
import Cropper from 'cropperjs';

const ImageCropper = ({ image, layout, position, setCropDetail }) => {
  const img = useRef(null);

  const getCanvasAndCropSize = (layout, position) => {
    const options = {
      width: 500, 
      height: 500, 
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
        this.cropper.setCropBoxData(cropperOpts);
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
      <img src={image} ref={img} className="d-none" style={{maxWidth: '100%'}}/>
    </div>
  )
};

export default ImageCropper;