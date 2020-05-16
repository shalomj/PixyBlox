import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CollageContext } from '../../context/CollageState';
import { getCollageWidth, getCollageHeight } from '../../utils';
import CollageHeader from '../CollageHeader';
import CollageBody from '../CollageBody';
import previewPlaceholder  from '../../assets/images/preview-placeholder.png';

const Collage = () => {
  const { state } = useContext(CollageContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const [preview, setPreview] = useState(previewPlaceholder);

  const sendRequest = async (formData) => {
    setBtnLoading(true);

    try {
      const response = await axios({
        method: 'POST', 
        url: process.env.REACT_APP_API_URL + '/collages', 
        data: formData, 
        headers: {
          'Content-Type': 'multipart/form-data', 
          'Accept': 'application/json'
        }
      });

      setBtnLoading(false);

      if (response.data.status === 'success') {
        const createdCollage = response.data.data;

        setPreview(createdCollage.upload_path);
      }
    } catch (error) {
      setBtnLoading(false);
    }
  };

  const processUpload = () => {
    const formData = new FormData();

    formData.append('title', 'Test');
    formData.append('description', 'This is a test collage');
    formData.append('layout', state.layout);

    state.photos.forEach((photo, index) => {
      formData.append(`photos[${index}][position]`, photo.position);
      formData.append(`photos[${index}][file]`, photo.file);
      formData.append(`photos[${index}][config]`, JSON.stringify(photo.config));
    });

    sendRequest(formData);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-6 d-flex justify-content-center">
          <div id="collage-container" style={{width: getCollageWidth()}}>
            <CollageHeader saveHandler={processUpload} btnLoading={btnLoading} />
            <CollageBody collageHeight={getCollageHeight()} />
          </div>
        </div>
        <div className="col-12 col-lg-6 d-flex justify-content-center">
          <div id="collage-preview-container" style={{width: getCollageWidth()}}>
            <p className="py-3 mb-0">Preview</p>
            <div id="collage-preview" style={{width: getCollageWidth(), height: getCollageHeight()}}>
              <img src={preview} alt="The collage preview"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collage;