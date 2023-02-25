import React from "react";
import { Link } from "react-router-dom";
import s from './RecipeCard.module.css'
const RecipeCard = ({id, title, diets, healthScore, image }) => {
   
    return (
        <div className={s.container}>
            <h3>{title}</h3>           
            <p>{`Tipo de Dieta: ${diets}`}</p>          
            <p>{`Health Score: ${healthScore}`}</p>
            <Link to={`/home/${id}`}>
                <img src={image} alt='imagen' />
            </Link>
            
        </div>
    )
};

export default RecipeCard;