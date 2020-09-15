import spotify from '../apis/spotify'

export const addGenre = (addGenre) => {
    return {type: 'ADD_GENRE', payload: addGenre};
};

export const saveToken = (token) => {
    // console.log(token)
    return {type: 'SAVE_TOKEN', payload: token}
}

export const fetchRecommendation = (seed_genres)  => async (dispatch, getState) => {
	let max_popularity = '80';
	const state = getState()
	
    const response = await spotify.get(`/recommendations?seed_genres=${seed_genres}&max_popularity=${max_popularity}`, {
        'headers' : {
            'Authorization': 'Bearer ' + state.token
        }
    });

    dispatch({type: 'FETCH_RECOMMENDATION', payload: response.data.tracks})
}

export const fetchUserDetail = () => async (dispatch, getState) => {
    const state = getState()

    const response = await spotify.get('/me', {
        'headers' : {
            'Authorization': 'Bearer ' + state.token
        }
    })

    dispatch({type: 'FETCH_USER_DETAIL', payload: response.data})
}

export const createAndFillPlaylist = () => async (dispatch, getState) => {
    const state = getState()
    let uris = state.recommendations.map(item => item.uri);

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

    dispatch({ type: "CREATE_PLAYLIST", payload: data });

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
      
    // await dispatch({ type: "FILL_PLAYLIST", payload: response.data });

    console.log(state)
    // setTimeout(console.log(state), 1000)
    // window.open(state.playlist.external_urls.spotify, "_blank")


}

export const createPlaylist = () => async (dispatch, getState) => {
    const state = getState()
    
    const data =  JSON.stringify({
        'name': 'Playlist Name',
        'description': 'Playlist description',
    })

    const response = await spotify.post(`/users/${state.user.id}/playlists`, data, {
        'headers' : {
            'Authorization': 'Bearer ' + state.token,
            'Content-Type': 'application/json'
        },
        
    }.then((res) => res.json()))

    return response.external_urls.spotify

    // dispatch({type: 'CREATE_PLAYLIST', payload: response.data})

}

export const fillPlaylist = () => async (dispatch, getState) => {
    const state = getState()
    let uris = state.recommendations.map(item => item.uri);

    const data =  JSON.stringify({
        'uris': uris
    })
    console.log('state.playlistDetail', state)
    const response = await spotify.post(`/playlists/${state.playlistDetail.id}/tracks`, data, {
        'headers' : {
            'Authorization': 'Bearer ' + state.token,
            'Content-Type': 'application/json'
        },
        
    })

    dispatch({type: 'FILL_PLAYLIST', payload: response.data})
}