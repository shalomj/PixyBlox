export function getGridAreaByLayout(layout) {
  return (layout > 1) ? `1 / 1 / ${layout} / auto` : '1'; 
};

export function getBlockStyleByLayoutPosition(layout, position, forLayoutSelect) {
  const style = {};

  if (position === 1) {
    style.gridArea = getGridAreaByLayout(layout);
  } else if (!forLayoutSelect && layout === 3 && position !== 1) {
    style.height = (parseInt(process.env.REACT_APP_COLLAGE_HEIGHT) / 2) + 'px';
  }

  return style;
}

export function getCollageWidth() {
  return process.env.REACT_APP_COLLAGE_WIDTH + 'px';
}

export function getCollageHeight() {
  return process.env.REACT_APP_COLLAGE_HEIGHT + 'px';
}