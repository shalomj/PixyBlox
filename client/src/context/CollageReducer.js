const CollageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LAYOUT':
        return {
          ...state, 
          layout: action.payload.layout
        }
      break;

    case 'SET_PHOTO':
        let photos = [];

        if (!state.photos.length)  {
          photos = [...state.photos, action.payload];
        } else {
          const photoIndex= state.photos.findIndex(photo => photo.position === action.payload.position);

          if (photoIndex === -1) {
            photos = [...state.photos, action.payload];
          } else {
            photos = state.photos.map(photo => {
              return photo.position === action.payload.position ? { ...photo, ...action.payload} : photo;
            });
            console.log('map');
          }
        }

        return {
          ...state, 
          photos: photos
        }
      break;
  
    default:
        return state;
      break;
  }
}

export default CollageReducer;
