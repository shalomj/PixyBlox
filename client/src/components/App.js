import React from 'react';
import Navbar from './Navbar';
import { CollageContextProvider } from '../context/CollageState';
import Collage from './Collage';

function App() {
  return (
    <>
      <Navbar />
      <main id="collage-wrapper" className="d-flex align-items-center justify-content-center">
        <CollageContextProvider>
          <Collage />
        </CollageContextProvider>
      </main>
    </>
  );
}

export default App;
