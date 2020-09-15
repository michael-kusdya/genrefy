export default (state = {}, action) => {
    switch (action.type) {
      case 'FETCH_USER_DETAIL':
        return action.payload
      default:
        return state;
    }  
};
  