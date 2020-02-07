import React from 'react';
import './component.css';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return(
        <div>
            <div className ='divTitleWelcome'>
                <p className = 'titleWelcome'>Welcome</p>
                <p className = 'titleWelcome'>To</p>
                <p className = 'titleWelcome'>Circus Seller</p>
            </div>
            <div className = 'buttonWelcome'>
                <Link className = 'linkTo' to ='/login'>Se connecter</Link>
                <Link className = 'linkTo' to ='/register'>S'inscrire</Link>
            </div>
        </div>
    )
}

export default Welcome; 