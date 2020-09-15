import React, {Component} from 'react';
import { connect } from 'react-redux';
import {  NavLink } from "react-router-dom";
import { saveToken, fetchRecommendation, fetchUserDetail } from '../actions';
import styled from 'styled-components';

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

const ButtonGo = styled(NavLink)`
    border: 5px solid;
    text-align: center;
    padding: 10px;
    width: 50px;
    cursor: pointer;
    margin: 10px;
    border-radius: 10px;
    background-color: transparent;
    color: #f2f2f2;
    font-weight: 600;
    font-size: 1em;
    outline: none;
    text-decoration: none;
`

const Subtitle = styled.h2`
    color: #f2f2f2;
`;

const qs = require('query-string');


class GenreSelector extends Component {

    state = {accessToken: null, selectedGenres: [], activeIndex: [] }

    genres = [
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

    componentDidMount() {
        if (window.performance) {
            if (performance.navigation.type === 1) {
                this.props.history.push("/");
            } else {
                const accessToken = qs
                    .parse(window.location.hash, {ignoreQueryPrefix: true})
                    .access_token;/* To bypass the leading question mark, use ignoreQueryPrefix:        */

                this.props.saveToken(accessToken)
                this.setState({accessToken: accessToken})
                this.props.fetchUserDetail()
                window.location.hash = ''
                // this.getUserInfo(accessToken)
            }
        } 
        
    }

    selectedGenre = (genre) => {
        if(this.state.selectedGenres.indexOf(genre) !== -1){
            this.setState(prevState => ({
                selectedGenres: prevState.selectedGenres.filter(item => item !== genre)
            }))
        } else {
            this.setState(prevState => ({
                selectedGenres: [...prevState.selectedGenres, genre]
            }))
        }
    }

    getRecommendations = () => {
        let seed_genres = this.state.selectedGenres.join(',')
        this.props.fetchRecommendation(seed_genres)
    }
    // 
    render() {
        return (
            <Wrapper>
                <Subtitle>Choose your favorite genre: </Subtitle>
                <WrapperButton>
                    { this.genres.map((genre, index) => (
                        <GenreButton selected={this.state.selectedGenres.includes(genre)} onClick={() => {this.selectedGenre(genre)}} key={index}>
                            {genre}
                        </GenreButton>
                    )) }
                </WrapperButton>
                { this.state.selectedGenres.length > 0 ? <ButtonGo to="/result" onClick={this.getRecommendations}> Go </ButtonGo> : null }
                
            </Wrapper>
        );
    }
}

export default connect(
    null,
    { saveToken, fetchRecommendation, fetchUserDetail }
  )(GenreSelector);

// export default Home;