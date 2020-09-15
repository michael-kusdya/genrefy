import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class SongCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    openSong = (url) => {
        window.open(url, '_blank')
    }
    render() {
        return (
                 this.props.recommendations.slice(0,12).map((item, index) => (
                        <Card onClick={() => this.openSong(item.external_urls.spotify)} key={index}>
                            <AlbumCover src={item.album.images[1].url} />
                            <SongDetailWrapper>
                                <ArtistName>{item.artists[0].name}</ArtistName>
                                <SongName>{item.name.length >= 20 ? item.name.slice(0, 20) + '...'  : item.name }</SongName>
                            </SongDetailWrapper>
                        </Card>
                )) 
         );
    }
}

const mapStateToProps = state => {
    return {recommendations: state.recommendations};
};

export default connect(mapStateToProps, null)(SongCard);