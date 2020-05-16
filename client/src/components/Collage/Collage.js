import React, { useContext } from 'react';
import axios from 'axios';
import { CollageContext } from '../../context/CollageState';
import CollageHeader from '../CollageHeader';
import CollageBody from '../CollageBody';

const Collage = () => {

  const { state } = useContext(CollageContext);

  const sendRequest = async (formData) => {
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
    } catch (error) {
      console.log(error);
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
    <div id="collage-container">
      <CollageHeader saveHandler={processUpload} />
      <CollageBody />
    </div>
  );
};

export default Collage;