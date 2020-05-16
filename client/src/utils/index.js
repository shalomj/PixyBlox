export function getGridAreaByLayout(layout) {
  return (layout > 1) ? `1 / 1 / ${layout} / auto` : '1'; 
};

export function getBlockStyleByLayoutPosition(layout, position, forLayoutSelect) {
  const style = {};

  if (position === 1) {
    style.gridArea = getGridAreaByLayout(layout);
  } else if (!forLayoutSelect) {
    style.height = '250px';
  }

  return style;
}