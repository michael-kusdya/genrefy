import {combineReducers} from 'redux';
import playlistReducer from './playlistReducer'
import recommendationReducer from './recommendationReducer'
import tokenReducer from './tokenReducer';
import userReducer from './userReducer'

export default combineReducers({
    // replaceMe: () => 'sccasasc'
    token: tokenReducer,
    recommendations: recommendationReducer,
    user: userReducer,
    playlistDetail: playlistReducer
});
