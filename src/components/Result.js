import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

import { createAndFillPlaylist, resetPlaylist } from '../actions'
import SongCard from './SongCard'
import NavButton from './NavButton';


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

const Result = () => {

    const dispatch = useDispatch();
    const playlistDetail = useSelector((state) => state?.playlistDetail)
    const recommendations = useSelector((state) => state?.recommendations)
    const history = useHistory();

    useEffect(() => {
        if(playlistDetail.external_urls?.spotify){
            window.open(playlistDetail.external_urls?.spotify, "_blank")
        }
    })

    const createPlaylist = async () => {
        dispatch(createAndFillPlaylist(recommendations))
    }

    const reset = async () => {
        dispatch(resetPlaylist())
        history.push('select-genre')
    }

    return (
        <Wrapper>
            <Subtitle>Songs you might like: </Subtitle> 
            <WrapperCard>   
                <SongCard />
            </WrapperCard>
            <WrapperNav>
                <NavButton handleClick={createPlaylist} text='Create Playlist'></NavButton>
                <NavButton handleClick={reset} text='Try Again'></NavButton>
            </WrapperNav>   
        </Wrapper>
    );
}



export default Result;

