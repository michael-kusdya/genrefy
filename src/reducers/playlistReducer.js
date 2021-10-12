import { CREATE_PLAYLIST, RESET_PLAYLIST, FIll_PLAYLIST } from '../constants/actionTypes'


export default(state = {}, action) => {
    switch (action.type) {
        case CREATE_PLAYLIST:
            return action.payload
        case FIll_PLAYLIST:
            return action.payload
        case RESET_PLAYLIST:
            return {}
        default:
            return state;
    }
};
