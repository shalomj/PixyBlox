import React, { useRef, useEffect } from 'react';
import Cropper from 'cropperjs';

const ImageCropper = ({ image, setCropDetail }) => {
  const img = useRef(null);

  const initCropper = (elem) => {
    const cropper = new Cropper(elem, {
      viewMode: 0, 
      dragMode: 'move', 
      responsive: true, 
      modal: false, 
      cropBoxMovable: false, 
      cropBoxResizable: false, 
      crop(event) {
        console.log(event.detail);

        setCropDetail(event.detail);
      }
    });
  }

  useEffect(() => {
    initCropper(img.current);
  }, []);

  return (
    <div className="w-100 h-100">
      <img src={image} ref={img} className="d-none" style={{maxWidth: '100%'}}/>
    </div>
  )
};

export default ImageCropper;