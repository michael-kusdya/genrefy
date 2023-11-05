import React from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
    align-items: center;
    margin: 50px 0;
`;

const Title = styled.h1`
    color: #f2f2f2;
    text-align: center;
    font-family: 'Merienda One', cursive;
    font-size: 3em;
`;

const Description = styled.h2`
    color: #f2f2f2;
    text-align: center;
    margin-bottom: 80px;
    margin-top: -20px;
`;


const Landing = () => {

    const getAccessToken = () => {

        const client_id = process.env.REACT_APP_CLIENT_ID
        let redirect_uri;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            redirect_uri = 'http://localhost:3000/select-genre';
        } else {
            redirect_uri = 'https://genrefy.netlify.app/';
        }
        const scope = 'user-read-recently-played,user-top-read,playlist-modify-public'
        let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scope}`

        window
            .location
            .replace(url)
    }

    return (
        <Wrapper>
            <Title>Genrefy</Title>
            <Description> Discover new song based on your favorite genre </Description>
            <NavButton handleClick={() => getAccessToken()} text='Connect to Spotify'></NavButton>
        </Wrapper>
    );
}

export default Landing;
