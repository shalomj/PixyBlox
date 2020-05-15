import React, { useContext, useState } from 'react';
import { CollageContext } from '../../context/CollageState';
import { getBlockStyleByLayoutPosition } from '../../utils';
import CollageUploader from '../CollageUploader/CollageUploader';
import ProgressBar from '../ProgressBar';

const CollageBlock = ({ block }) => {
  const { state } = useContext(CollageContext);
  const [isUploading, setIsUploading] = useState(false);
  const [fileReadProgress, setFileReadProgress] = useState(0);
  const [fileSelected, setFileSelected] = useState(false);
  const [preview, setPreview] = useState(null);

  const finalClassName = `collage-block ${block.bgClassName}`;
  const style = getBlockStyleByLayoutPosition(state.layout, block.position);

  const handleSelectedFile = file => {

    setIsUploading(true);
    setFileReadProgress(0);

    const fileReader = new FileReader();

    fileReader.addEventListener('load', event => {
      const result = event.target.result;

      // Process result
      setFileSelected(true);
      setPreview(result);
    });

    fileReader.addEventListener('progress', event => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;

        console.log(percent);

        setFileReadProgress(percent);

        if (percent === 100) {
          setTimeout(() => {
            setIsUploading(false);  
          }, 1000);
        }
      }
    });

    fileReader.readAsDataURL(file);
  };

  let content;

  if (isUploading) {
    content = <ProgressBar percent={fileReadProgress} />
  } else if (fileSelected) { 
    content = <img src={preview} className="w-100 h-100" />;
  } else {
    content = <CollageUploader position={block.position} selectedFileHandler={handleSelectedFile} />
  }

  return (
    <section className={finalClassName} style={style}>
      {content}
    </section>
  );
};

export default CollageBlock;