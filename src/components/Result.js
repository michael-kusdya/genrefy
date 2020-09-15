import React, {Component} from 'react';
import { connect } from 'react-redux';
import {  NavLink  } from "react-router-dom";
import { createAndFillPlaylist } from '../actions'
import SongCard from './SongCard'
import NavButton from './NavButton';
import styled from 'styled-components';

const WrapperCard = styled.div`
    display: grid;
    gap: 0.5rem;
    min-width: 0;
    grid-template-columns: repeat(3, 250px);
    @media only screen and (max-width: 830px) {
        grid-template-columns: repeat(2, 250px);
    }
    @media only screen and (max-width: 600px) {
        grid-template-columns: repeat(2, 140px);
    }
    margin: 50px 0;
`;

const WrapperNav = styled.div`
    display: flex;
    margin-bottom: 50px;
`;

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Subtitle = styled.h2`
    color: #f2f2f2;
`;

const ButtonBack = styled(NavLink)`
    border: 5px solid;
    text-align: center;
    padding: 10px;
    width: 100px;
    cursor: pointer;
    margin: 10px;
    border-radius: 10px;
    background-color: transparent;
    color: #f2f2f2;
    font-weight: 700;
    font-size: 1em;
    outline: none;
    text-decoration: none;
`

class Result extends Component {
    constructor(props) {
        super(props);
        if (window.performance) {
            if (performance.navigation.type === 1) {
                this.props.history.push("/");
            }
        } 
    }

    createPlaylist = async () => {
        await this.props.createAndFillPlaylist()
        window.open(this.props.playlist.external_urls.spotify, "_blank")
    }

    render() {
        return (
            <Wrapper>
                <Subtitle>Songs you might like: </Subtitle> 
                <WrapperCard>   
                    <SongCard />
                </WrapperCard>
                <WrapperNav>
                    <NavButton handleClick={this.createPlaylist} text='Create Playlist'></NavButton>
                    <ButtonBack to='/'>Try Again</ButtonBack>
                </WrapperNav>   
            </Wrapper>
        );
        
    }
}

const mapStateToProps = state => {
    return {playlist: state.playlistDetail};
};

export default connect(mapStateToProps, {createAndFillPlaylist})(Result);

