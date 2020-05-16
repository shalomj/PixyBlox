import React, { useContext } from 'react';
import CollageHeader from '../CollageHeader';
import CollageBody from '../CollageBody';

const Collage = () => {

  return (
    <div id="collage-container">
      <CollageHeader />
      <CollageBody />
    </div>
  );
};

export default Collage;