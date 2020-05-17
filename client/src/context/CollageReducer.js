/**
 * Reducer for Collage context
 * 
 * @param {Object} state The state of the context
 * @param {Object} action Action to update the state
 */
const CollageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LAYOUT':
        return {
          ...state, 
          layout: action.payload.layout
        }

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
          }
        }

        return {
          ...state, 
          photos: photos
        }

    default:
        return state;
  }
}

export default CollageReducer;
