import React, { useRef } from 'react';

const CollageUploader = ({ position }) => {
  const inputFile = useRef(null);

  const handleUploadedFile = e => {
    console.log(e.target.files);
  }

  const handleBrowseClick = e => {
    inputFile.current.click();
  };

  return (
    <div className="collage-block-uploader d-flex align-items-center justify-content-center">
      <div className="w-100 text-center px-5">
        <p>Photo {position}</p>
        <input type="file" ref={inputFile} className="d-none" accept="image/png,image/jpeg" onChange={handleUploadedFile}/>
        <button className="btn btn-light btn-lg d-block shadow text-uppercase w-100" onClick={handleBrowseClick}>Browse</button>
      </div>
    </div>
  )
};

export default CollageUploader;