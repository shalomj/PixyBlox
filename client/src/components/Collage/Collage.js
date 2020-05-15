import React, { useContext } from 'react';
import { CollageContextProvider } from '../../context/CollageState';
import CollageHeader from '../CollageHeader';
import CollageBody from '../CollageBody';

const Collage = () => {
  return (
    <CollageContextProvider>
      <main id="collage-wrapper" className="d-flex align-items-center">
        <div id="collage-container">
          <CollageHeader />
          <CollageBody />
        </div>
      </main>
    </CollageContextProvider>
  )
};

export default Collage;