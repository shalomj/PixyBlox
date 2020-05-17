/**
 * Get grid-area style value based on layout
 * 
 * @param {Number} layout The selected layout style
 */
export function getGridAreaByLayout(layout) {
  return (layout > 1) ? `1 / 1 / ${layout} / auto` : '1'; 
};

/**
 * Get the style of the block based on the selected layout and its position
 * 
 * @param {Number} layout The selected layout style
 * @param {Number} position Position number of the block or tile
 * @param {Boolean} forLayoutSelect If the block is for the layout selection
 */
export function getBlockStyleByLayoutPosition(layout, position, forLayoutSelect) {
  const style = {};

  if (position === 1) {
    style.gridArea = getGridAreaByLayout(layout);
  } else if (!forLayoutSelect && layout === 3 && position !== 1) {
    style.height = (parseInt(process.env.REACT_APP_COLLAGE_HEIGHT) / 2) + 'px';
  }

  return style;
}

/**
 * Get the collage width from the environment variable
 */
export function getCollageWidth() {
  return process.env.REACT_APP_COLLAGE_WIDTH + 'px';
}

/**
 * Get the collage height from the environment variable
 */
export function getCollageHeight() {
  return process.env.REACT_APP_COLLAGE_HEIGHT + 'px';
}