import React from "react";
import { Link } from "react-router-dom";
import s from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={s.landing}>
            <h1 className ={s.titulo}>Welcome!</h1>
            <Link to='/home'>
                <h2>HOME</h2>
            </Link>
        </div>
    );
}

export default LandingPage;