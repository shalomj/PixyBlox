const CollageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LAYOUT':
        return {
          ...state, 
          layout: layout
        }
      break;
  
    default:
        return state;
      break;
  }
}

export default CollageReducer;
