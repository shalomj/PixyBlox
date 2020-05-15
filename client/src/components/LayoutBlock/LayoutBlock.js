import React from 'react';

const LayoutBlock = ({ layout, position }) => {

  const style = {};

  if (position === 1) {
    style.gridArea = (layout > 1) ? `1 / 1 / ${layout} / auto` : '1'; 
  }

  return (
    <section className={`collage-layout-block layout-block-${position}`} style={style}>
      <span>{position}</span>
    </section>
  );
};

export default LayoutBlock;