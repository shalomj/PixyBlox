import React, { useRef } from 'react';

/**
 * Component for file upload for each collage block
 * 
 * @param {Number} param0 The position of the block where this component is rendered
 * @param {Function} param1 Function to call when the user select a file to upload
 */
const CollageUploader = ({ position, selectedFileHandler }) => {
  const inputFile = useRef(null);

  /**
   * Handles the onChange event of the file
   * 
   * @param {Object} event Change event of the file
   */
  const handleOnFileChange = event => {
    const fileList = event.target.files;

    if (!fileList.length) {
      return;
    }

    const file = fileList[0];

    // Check if the file uploaded is an image
    if (file && file.type.indexOf('image') === -1) {
      return;
    }

    selectedFileHandler(file);
  };

  /**
   * Handles onClick event of the Browse button
   * 
   * @param {Object} event Click event
   */
  const handleBrowseClick = event => {
    inputFile.current.click();
  };

  return (
    <div className="collage-block-uploader d-flex align-items-center justify-content-center">
      <div className="w-100 text-center px-4">
        <p>Photo {position}</p>
        <input type="file" ref={inputFile} className="d-none" accept="image/png,image/jpeg" onChange={handleOnFileChange}/>
        <button className="btn btn-light btn-lg d-block shadow text-uppercase w-100" onClick={handleBrowseClick}>Browse</button>
      </div>
    </div>
  )
};

export default CollageUploader;