export default(state = {}, action) => {
    switch (action.type) {
        case 'CREATE_PLAYLIST':
            return action.payload
        case 'FIll_PLAYLIST':
            return action.payload
        default:
            return state;
    }
};
