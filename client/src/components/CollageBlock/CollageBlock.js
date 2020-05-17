import React, { useContext, useState } from 'react';
import { CollageContext } from '../../context/CollageState';
import { getBlockStyleByLayoutPosition } from '../../utils';
import FileReaderService from '../../services/FileReaderService';
import CollageUploader from '../CollageUploader/CollageUploader';
import ProgressBar from '../ProgressBar';
import ImageCropper from '../ImageCropper';

/**
 * Component for each block on the collage
 * 
 * @param {Object} param0 Block config
 */
const CollageBlock = ({ block }) => {
  const { state, dispatch } = useContext(CollageContext);
  const [isUploading, setIsUploading] = useState(false);
  const [fileReadProgress, setFileReadProgress] = useState(0);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [preview, setPreview] = useState(null);

  /**
   * Set the crop details of the photo on the context state
   * 
   * @param {Object} cropDetail The crop detail provided by Cropperjs
   */
  const setCropDetail = (cropDetail) => {
    dispatch({
      type: 'SET_PHOTO', 
      payload: {
        position: block.position, 
        config: cropDetail
      }
    });
  };

  /**
   * Set the file on the context state
   * 
   * @param {Object} file The selected file
   */
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

    // Read the file
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

  const finalClassName = `collage-block ${block.bgClassName}`;
  const style = getBlockStyleByLayoutPosition(state.layout, block.position);

  let content;

  if (isUploading) {
    content = <ProgressBar percent={fileReadProgress} />
  } else if (fileLoaded) { 
    content = <ImageCropper image={preview} layout={state.layout} position={block.position} setCropDetail={setCropDetail} />
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