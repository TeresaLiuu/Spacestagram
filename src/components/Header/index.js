import React from 'react';
import Jumbotron from '../Jumbotron';
import './style.css'

function Header(){
    return(
        <Jumbotron>
            <h1 className="gradient-text">Spacestagram</h1>
        </Jumbotron>
    )
}


export default Header;