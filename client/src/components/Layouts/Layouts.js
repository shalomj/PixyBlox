import React, { useContext } from 'react';
import { CollageContext } from '../../context/CollageState';
import Layout from '../Layout';

const layouts = [
  {
    layout: 1, 
    blocks: 1
  },
  {
    layout: 2, 
    blocks: 2
  },
  {
    layout: 3, 
    blocks: 3
  },
];

const Layouts = () => {

  const { dispatch } = useContext(CollageContext);

  const changeLayoutOnClick = layout => {
    dispatch({
      type: 'SET_LAYOUT', 
      payload: {
        layout: layout
      }
    });
  };

  return(
    <div id="collage-layout-container">
      {
        layouts.map(layout => {
          return (
            <a key={layout.layout} onClick={() => changeLayoutOnClick(layout.layout)}>
              <Layout  layout={layout}/>
            </a>
          )
        })
      }
    </div>
  );
};

export default Layouts;