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
          photos.push(action.payload);
        } else {
          photos = state.photos.map(photo => {
            return photo.position === action.payload.position ? { ...photo, ...action.payload} : photo;
          });
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
