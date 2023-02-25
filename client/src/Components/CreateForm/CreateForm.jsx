import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { createRecipe, getDiets } from "../../redux/actions/actions";


function validate(input){
    let errors = {}
    if(!input.title) errors.title = "Title required!";
    if(!input.summary) errors.summary = "Summary required!";
    return errors;
};

const CreateForm = () => {
    const dispatch = useDispatch();
    
    const diets = useSelector((state)=> state.diets)
    const [input, setInput] = useState({
        title: "",
        summary: "",
        healthScore: 0,
        typeOfDiet: [],
        instructions: "",
        image: ""
    })
    const [error , setError] = useState({})

    useEffect(()=>{
        dispatch(getDiets());
    }, [dispatch]);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }
    const handleSubmit = (e) =>{
        dispatch(createRecipe(input))
        
        alert("Created!")
        setInput({
        title: "",
        summary: "",
        healthScore: 0,
        typeOfDiet: [],
        instructions: "",
        image: ""
        })

        
    }
    const handleSelect = (e) =>{
        setInput({
            ...input,
            typeOfDiet: [...input.typeOfDiet, e.target.value]
        })
    }
   
    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" placeholder="Title" name="title" value={input.title} onChange={e => handleChange(e)} />
                {error.title && (<p>{error.title}</p>)}
                <input type="text" placeholder="Summary" name="summary" value={input.summary} onChange={e => handleChange(e)} />
                {error.summary && (<p>{error.summary}</p>)}
                <input type="number" name="healthScore" value={input.healthScore} onChange={e => handleChange(e)} />
                <input type="text" placeholder="Instructions" name="instructions" value={input.instructions} onChange={e => handleChange(e)} />
                <input type="text" placeholder="Image URL" name="image" value={input.image} onChange={e => handleChange(e)} />
                <select onChange={e=> handleSelect(e)}>
                <option value="s">Type of diet</option>
                    {                        
                    diets.map( d => {
                        return (
                       <option key={d.name} value={d.name}>{d.name}</option>
                       )
                    })            
                    }
                </select>
                <ul><li>{input.typeOfDiet.map(el => el + ", ")}</li></ul>
                
                <button type="submit" disabled={input.title ? false : true}>Create Recipe</button>
            </form>
            <Link to='/home'>
                <h2>Home</h2>
            </Link>
        </div>
    )
}

export default CreateForm