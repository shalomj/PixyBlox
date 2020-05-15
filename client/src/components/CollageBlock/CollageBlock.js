import React, { useContext } from 'react';
import { CollageContext } from '../../context/CollageState';
import { getBlockStyleByLayoutPosition } from '../../utils';

const CollageBlock = ({ block }) => {
  const { state } = useContext(CollageContext);

  const finalClassName = `collage-block ${block.bgClassName}`;
  const style = getBlockStyleByLayoutPosition(state.layout, block.position);

  return (
    <section className={finalClassName} style={style}>
      <div className="collage-block-uploader">
      </div>
    </section>
  );
};

export default CollageBlock;