import React, { useContext } from 'react';
import { CollageContext } from '../../context/CollageState';
import LayoutBlock from '../LayoutBlock';

const Layout = ({ layout }) => {
  const { state } = useContext(CollageContext);

  const style = {};

  if (layout.blocks > 1) {
    style.gridTemplateColumns = 'repeat(2, minmax(20px, 1fr))';
  }

  let blocks = [];

  for (let x = 1; x <= layout.blocks; x++) {
    blocks.push(<LayoutBlock key={x} layout={layout.layout} position={x} />);
  }

  return (
    <div className={'collage-layout shadow-sm' + (layout.layout === state.layout ? ' active' : '')} style={style}>
      {blocks}
    </div>
  )
};

export default Layout;