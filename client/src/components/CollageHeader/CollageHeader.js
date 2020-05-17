import React from 'react';
import Layouts from '../Layouts';

/**
 * Component for the collage header layout
 * 
 * @param {Function} param0 Save button onClick event handler
 * @param {Boolean} param1 When true, the save button will be disabled and a loading icon will be display next to the label
 */
const CollageHeader = ({ saveHandler, btnLoading }) => {
  return (
    <header id="collage-header" className="d-flex align-items-center justify-content-between">
      <Layouts />
      <button className="btn btn-primary shadow d-flex align-items-center" onClick={saveHandler} disabled={(btnLoading ? 'disabled' : false)}>Save 
      {(btnLoading ? <span className="spinner-grow spinner-sm text-light ml-2" role="status">
          <span className="sr-only">Loading...</span>
        </span> : ''
      )}
      </button>
    </header>
  )
};

export default CollageHeader;