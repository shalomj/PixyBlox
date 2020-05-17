import React from 'react';

/**
 * Component for the progress bar
 * 
 * @param {Number} param0 The width of the progress bar
 * @param {Number} param1 The height of the progress bar
 */
const ProgressBar = ({ percent, height }) => {
  const progressHeight = height || 5;

  return (
    <div className="d-flex align-items-center justify-content-center px-5 w-100 h-100">
      <div className="progress w-100" style={{height: `${progressHeight}px`}}>
        <div className="progress-bar" role="progressbar" style={{width: `${percent}%`}} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
  );
}

export default ProgressBar;