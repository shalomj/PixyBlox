import React from 'react';
import Layouts from '../Layouts';

const CollageHeader = ({ saveHandler, btnLoading }) => {
  return (
    <header id="collage-header" className="d-flex align-items-center justify-content-between">
      <Layouts />
      <button className="btn btn-primary shadow d-flex align-items-center" onClick={saveHandler} disabled={(btnLoading ? 'disabled' : false)}>Save 
      {(btnLoading ? <span class="spinner-grow spinner-sm text-light ml-2" role="status">
          <span class="sr-only">Loading...</span>
        </span> : ''
      )}
      </button>
    </header>
  )
};

export default CollageHeader;