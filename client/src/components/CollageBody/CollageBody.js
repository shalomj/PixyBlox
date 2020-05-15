import React, { useContext } from 'react';
import { CollageContext } from '../../context/CollageState';
import CollageBlock from '../CollageBlock';

const CollageBody = () => {
  const { state } = useContext(CollageContext);

  let blocks = [];

  for (let x = 1; x <= state.layout; x++) {
    blocks.push({
      position: x, 
      bgClassName: `collage-bg-${x}`, 
    });
  }

  const style = (state.layout > 1) ? { gridTemplateColumns: `repeat(2, minmax(200px, 1fr))` } : {};

  return (
    <div id="collage-body" style={style} className="shadow-lg">
      {blocks.map((block, key) => {
        return <CollageBlock key={key} block={block} />
      })}
    </div>
  );
};

export default CollageBody;