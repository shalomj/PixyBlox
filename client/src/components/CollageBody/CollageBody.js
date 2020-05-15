import React, { useContext } from 'react';
import { CollageContext } from '../../context/CollageState';

const CollageBody = () => {
  return (
    <div id="collage-body" className="shadow">
      <section className="collage-block">
        <div className="collage-block-uploader">
        </div>
      </section>
    </div>
  );
};

export default CollageBody;