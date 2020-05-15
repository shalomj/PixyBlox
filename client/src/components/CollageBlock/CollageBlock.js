import React, { useContext } from 'react';
import { CollageContext } from '../../context/CollageState';
import { getBlockStyleByLayoutPosition } from '../../utils';
import CollageUploader from '../CollageUploader/CollageUploader';

const CollageBlock = ({ block }) => {
  const { state } = useContext(CollageContext);

  const finalClassName = `collage-block ${block.bgClassName}`;
  const style = getBlockStyleByLayoutPosition(state.layout, block.position);

  return (
    <section className={finalClassName} style={style}>
      <CollageUploader position={block.position} />
    </section>
  );
};

export default CollageBlock;