import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { getRecipeDetail, clearState } from "../../redux/actions/actions";
import { useEffect } from "react";

export default function RecipeDetail(props) {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getRecipeDetail(props.match.params.id));
    },[dispatch, props.match.params.id])

    const detail = useSelector((state) => state.detail)

    function desmontar(){
        dispatch(clearState())
    }  

    return (
        <div>
            {
                detail?
                <div>
                    <h1>{detail.title}</h1>
                    <p>Summary: {detail.summary?.replace(/<[^>]*>/g, '')}</p>
                    <h2>Health Score: {detail.healthScore}</h2>
                    <h3>Diets: {detail.diets}</h3>
                    <h5>Instructions: {detail.instructions}</h5>
                    {console.log("detail",detail)}
                    <img src= {detail.image} alt="foto" />
                </div> 
                :
                <h3>No se encontró la receta</h3>
            } 
            <Link to="/home">
                <button type="button" onClick={()=>desmontar()}>Volver</button>
            </Link>
        </div>
    )



}
