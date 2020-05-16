import React from 'react';
import { getBlockStyleByLayoutPosition } from '../../utils';

const LayoutBlock = ({ layout, position }) => {

  const style = getBlockStyleByLayoutPosition(layout, position);

  return (
    <section className={`collage-layout-block layout-block-${position}`} style={style}>
      <span>{position}</span>
    </section>
  );
};

export default LayoutBlock;