export default(state = [], action) => {

    switch (action.type) {
        case 'FETCH_RECOMMENDATION':
            return action.payload
        default:
            return state;
    }
};
