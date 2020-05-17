import React from 'react';
import { getBlockStyleByLayoutPosition } from '../../utils';

/**
 * Component for each block on the layout
 * 
 * @param {Number} param0 The selected layout
 * @param {Number} param1 The position of the block
 */
const LayoutBlock = ({ layout, position }) => {

  // Get the style of the block
  const style = getBlockStyleByLayoutPosition(layout, position, true);

  return (
    <section className={`collage-layout-block layout-block-${position}`} style={style}>
      <span>{position}</span>
    </section>
  );
};

export default LayoutBlock;