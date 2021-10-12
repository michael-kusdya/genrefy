import React from 'react';
import styled from 'styled-components';

const Nav = styled.button`
    border: 5px solid;
    text-align: center;
    padding: 10px;
    width: 150px;
    cursor: pointer;
    margin: 10px;
    border-radius: 10px;
    background-color: transparent;
    color: #f2f2f2;
    font-weight: 600;
    font-size: 1em;
    outline: none;
    height: 60px;
`;

const NavButton = ({handleClick, text}) => {
    return ( <Nav onClick={handleClick}> {text} </Nav> );
}
 
export default NavButton
