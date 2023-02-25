import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { getRecipeByName } from "../../redux/actions/actions";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getRecipeByName(name))
    }

    return (
        <div>
            <input
            type = "text"
            placeholder = "Name..."
            onChange = {(e)=>handleInputChange(e)}
            />
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )
}

