import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

import NavButton from './NavButton';
import { saveToken, fetchRecommendation, fetchUserDetail } from '../actions';


const WrapperButton = styled.div`
    display: flex;
    max-width: 600px;
    flex-wrap: wrap;
    justify-content: center;
    margin: 25px 0;
`;

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px 0;
`;

const GenreButton = styled.button`
    color: ${props => props.selected ? "#4b5d67" : "#f2f2f2"};
    background-color: ${props => props.selected ? "white" : "transparent"};
    font-weight: 600;
    outline:none;
    text-align: center;
    padding: 10px;
    font-size: 1em;
    cursor: pointer;
    margin: 10px;
    border: ${props => props.selected ? "none" : "2px solid"} ;
    border-radius: 10px;
`;

const Subtitle = styled.h2`
    color: #f2f2f2;
`;

const qs = require('query-string');


const GenreSelector = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(!tokenFromState){
            const tokenFromUrl = qs
                .parse(window.location.hash, {ignoreQueryPrefix: true})
                .access_token;/* To bypass the leading question mark, use ignoreQueryPrefix:        */
            dispatch(saveToken(tokenFromUrl))
            dispatch(fetchUserDetail(tokenFromUrl))
            window.location.hash = '' 
        }
    }, [])

    const tokenFromState = useSelector((state) => state?.token)

    const [selectedGenres, setSelectedGenres] = useState([])
    const genres = [
        "acoustic",
        "afrobeat",
        "alt-rock",
        "alternative",
        "black-metal",
        "blues",
        "classical",
        "country",
        "dance",
        "death-metal",
        "disco",
        "dubstep",
        "edm",
        "electro",
        "emo",
        "folk",
        "funk",
        "gospel",
        "goth",
        "grindcore",
        "groove",
        "grunge",
        "hardcore",
        "heavy-metal",
        "hip-hop",
        "house",
        "indie",
        "j-pop",
        "j-rock",
        "jazz",
        "k-pop",
        "metal",
        "metalcore",
        "pop",
        "psych-rock",
        "punk",
        "punk-rock",
        "r-n-b",
        "reggae",
        "rock",
        "rock-n-roll",
        "ska",
        "soul",
        "synth-pop",
        "techno",
        "trance",
    ]



    const selectedGenre = (genre) => {
        if(selectedGenres.indexOf(genre) !== -1){
            setSelectedGenres(prevState => prevState.filter(item => item !== genre))
        } else {
            setSelectedGenres(prevState => [...prevState, genre])
        }
    }

    const getRecommendations = () => {
        let seed_genres = selectedGenres.join(',')
        dispatch(fetchRecommendation(seed_genres, tokenFromState))
        history.push('result')
    }
    // 
    return (
        <Wrapper>
            <Subtitle>Choose your favorite genre: </Subtitle>
            <WrapperButton>
                { genres.map((genre, index) => (
                    <GenreButton selected={selectedGenres.includes(genre)} onClick={() => {selectedGenre(genre)}} key={index}>
                        {genre}
                    </GenreButton>
                )) }
            </WrapperButton>
            { selectedGenres.length > 0 ? <NavButton handleClick={getRecommendations} text='Go' />: null }
            
        </Wrapper>
    );
}

export default GenreSelector;