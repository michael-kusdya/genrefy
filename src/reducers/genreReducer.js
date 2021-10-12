import { ADD_GENRE } from '../constants/actionTypes'


export default (state = {}, action) => {
    console.log(state);
  
    switch (action.type) {
      case ADD_GENRE:
        return { ...state, ..._.mapKeys(action.payload, 'id') };
      default:
        return state;
    }  
  };
  