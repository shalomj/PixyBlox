import React from 'react';
import Layouts from '../Layouts';

const CollageHeader = () => {
  return (
    <header id="collage-header" className="d-flex align-items-center justify-content-between">
      <Layouts />
      <button className="btn btn-primary shadow-sm">Save</button>
    </header>
  )
};

export default CollageHeader;