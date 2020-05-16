import React, { useContext, useState } from 'react';
import { CollageContext } from '../../context/CollageState';
import { getBlockStyleByLayoutPosition } from '../../utils';
import FileReaderService from '../../services/FileReaderService';
import CollageUploader from '../CollageUploader/CollageUploader';
import ProgressBar from '../ProgressBar';
import ImageCropper from '../ImageCropper';

const CollageBlock = ({ block }) => {
  const { state, dispatch } = useContext(CollageContext);
  const [isUploading, setIsUploading] = useState(false);
  const [fileReadProgress, setFileReadProgress] = useState(0);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [preview, setPreview] = useState(null);
  const [cropDetail, setCropDetail] = useState({});

  const finalClassName = `collage-block ${block.bgClassName}`;
  const style = getBlockStyleByLayoutPosition(state.layout, block.position);

  const handleSelectedFile = file => {
    dispatch({
      type: 'SET_PHOTO', 
      payload: {
        position: block.position, 
        file: file, 
        config: {}
      }
    });

    setIsUploading(true);
    setFileReadProgress(0);

    const fileReader = new FileReaderService(file, {
      progress: percent => {
        setFileReadProgress(percent);
      },
      completed: () => {
        setTimeout(() => {
          setIsUploading(false);  
        }, 1000);
      },
      load: result => {
        setFileLoaded(true);
        setPreview(result);
      }
    });

    fileReader.read();
  };

  let content;

  if (isUploading) {
    content = <ProgressBar percent={fileReadProgress} />
  } else if (fileLoaded) { 
    content = <ImageCropper image={preview} setCropDetail={setCropDetail} />
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