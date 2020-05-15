import React, { useContext } from 'react';
import { CollageContext } from '../../context/CollageState';
import { getBlockStyleByLayoutPosition } from '../../utils';

const CollageBlock = ({ block }) => {
  const { state } = useContext(CollageContext);

  const finalClassName = `collage-block ${block.bgClassName}`;
  const style = getBlockStyleByLayoutPosition(state.layout, block.position);

  return (
    <section className={finalClassName} style={style}>
      <div className="collage-block-uploader d-flex align-items-center justify-content-center">
        <div className="w-100 text-center px-5">
          <p>Photo {block.position}</p>
          <button className="btn btn-light btn-lg d-block shadow text-uppercase w-100">Browse</button>
        </div>
      </div>
    </section>
  );
};

export default CollageBlock;