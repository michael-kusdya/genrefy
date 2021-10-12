import spotify from '../apis/spotify'
import { SAVE_TOKEN, FETCH_USER_DETAIL, ADD_GENRE, FETCH_RECOMMENDATION, CREATE_PLAYLIST, RESET_PLAYLIST } from '../constants/actionTypes'

export const addGenre = (addGenre) => {
    return {type: ADD_GENRE, payload: addGenre};
};

export const saveToken = (token) => {
    return {type: SAVE_TOKEN, payload: token}
}

export const fetchRecommendation = (seed_genres, token)  => async (dispatch) => {
	let max_popularity = '80';
	
    const response = await spotify.get(`/recommendations?seed_genres=${seed_genres}&max_popularity=${max_popularity}`, {
        'headers' : {
            'Authorization': 'Bearer ' + token
        }
    });

    dispatch({type: FETCH_RECOMMENDATION, payload: response.data.tracks})
}

export const fetchUserDetail = (token) => async (dispatch) => {
    const response = await spotify.get('/me', {
        'headers' : {
            'Authorization': 'Bearer ' + token
        }
    })

    dispatch({type: FETCH_USER_DETAIL, payload: response.data})
}

export const createAndFillPlaylist = (recommendations) => async (dispatch, getState) => {
    let uris = recommendations.map(item => item.uri);
    const state = getState();
    const PlayListBody  =  JSON.stringify({
        'name': 'Genrefy Playlist'
        // 'description': 'Genrefy playlist description',
    })

    const headers = {
        'Authorization': 'Bearer ' + state.token,
        'Content-Type': 'application/json'
    }

    const { data } = await spotify.post(
        `/users/${state.user.id}/playlists`,
        PlayListBody,
        { headers }
    );

    dispatch({ type: CREATE_PLAYLIST, payload: data });

    const createPlaylistBody = JSON.stringify({
        uris: uris
    });

    await spotify.post(
        `/playlists/${data.id}/tracks`,
        createPlaylistBody,
        {
          headers
        }
    )

}


export const resetPlaylist = () => async (dispatch) => {
    dispatch({ type: RESET_PLAYLIST });
}
