import React, { useContext } from 'react';
import { CollageContext } from '../../context/CollageState';
import Layout from '../Layout';

// Available layouts
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

/**
 * Component to the layout selection
 */
const Layouts = () => {

  const { dispatch } = useContext(CollageContext);

  /**
   * Update the layout state on the context
   * 
   * @param {Number} layout The selected layout
   */
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
            <div key={layout.layout} onClick={() => changeLayoutOnClick(layout.layout)}>
              <Layout  layout={layout}/>
            </div>
          )
        })
      }
    </div>
  );
};

export default Layouts;