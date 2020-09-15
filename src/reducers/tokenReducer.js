export default(state = '', action) => {
    switch (action.type) {
        case 'SAVE_TOKEN':
            return action.payload
        default:
            return state;
    }
};
