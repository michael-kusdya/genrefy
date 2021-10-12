import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Card = styled.div`
    cursor: pointer;
    margin: 10px 0;
    color: #f2f2f2;
`;



const AlbumCover = styled.img`
    height: 80px;
    width: 80px;
    float: left;
    @media only screen and (max-width: 600px) {
        height: 60px;
        width: 60px;
    }
`;

const SongDetailWrapper = styled.div`
    margin-left: 90px;
    margin-top: -25px;
    @media only screen and (max-width: 600px) {
        margin-top: -15px;
        margin-left: 70px;
    }
`;

const ArtistName = styled.p`
    font-size: 18px;
    font-weight: 800;
    @media only screen and (max-width: 600px) {
        font-size: 14px;
    }
`;

const SongName = styled.p`
    font-size: 14px;
    font-weight: 600;
    @media only screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

const SongCard = () => {

    const recommendations = useSelector((state) => state?.recommendations)
    const openSong = (url) => {
        window.open(url, '_blank')
    }

    return (
        recommendations.slice(0,12).map((item, index) => (
               <Card onClick={() => openSong(item.external_urls.spotify)} key={index}>
                   <AlbumCover src={item.album.images[1].url} />
                   <SongDetailWrapper>
                       <ArtistName>{item.artists[0].name}</ArtistName>
                       <SongName>{item.name.length >= 20 ? item.name.slice(0, 20) + '...'  : item.name }</SongName>
                   </SongDetailWrapper>
               </Card>
       )) 
    );
}

export default SongCard;