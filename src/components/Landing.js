import React, {Component} from 'react';
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


class Landing extends Component {

    getAccessToken = () => {

        const client_id = '8c3867d5b746458d88de9964a5d8761d'
        let redirect_uri;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            redirect_uri = 'http://localhost:3000/genrefy/select-genre';
        } else {
            redirect_uri = 'https://michael-kusdya.github.io/genrefy/select-genre';
        }
        const scope = 'user-read-recently-played,user-top-read,playlist-modify-public'
        let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scope}`

        window
            .location
            .replace(url)
    }

    render() {
        return (
            <Wrapper>
                <Title>Genrefy</Title>
                <Description> Discover new song based on your favorite genre </Description>
                <NavButton handleClick={() => this.getAccessToken()} text='Connect to Spotify'></NavButton>
            </Wrapper>
        );
    }
}

export default Landing;