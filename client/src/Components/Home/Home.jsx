import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllRecipes, filterByDiet, orderByName, orderByHS } from "../../redux/actions/actions";
import Pagination from '../Pagination/Pagination';
import RecipeCard from "../RecipeCard/RecipeCard";
import SearchBar from '../SearchBar/SearchBar';



const Home = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector ((state) => state.recipes);

    const [order, setOrder] = useState('')

    const [page, setPage] = useState(1);
    const showPerPage = 9;
    
    const lastOnpage = page * showPerPage;
    const firstOnPage = lastOnpage - showPerPage;
    const showRecipes = allRecipes.slice(firstOnPage, lastOnpage);
    
    function pagination(pageNumber){
        setPage(pageNumber)
    }
    
    useEffect(() => {
        dispatch(getAllRecipes());
    }, [dispatch]);
     
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getAllRecipes())
    }
    function handleFilterDiet(e){
        e.preventDefault();
        dispatch(filterByDiet(e.target.value))
        setPage(1);
    }
    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setOrder(`Order ${e.target.value}`);
    }
    function handleScore(e){
        e.preventDefault()
        dispatch(orderByHS(e.target.value))
        setOrder(`Order ${e.target.value}`);
    }

    return (
        <div>
            <Link to='/create'><h2>Create Recipe</h2></Link>
            <SearchBar/>
            <h1>PI FOOD</h1>
            <button onClick={e=>handleClick(e)}>Reload</button>
            <div>
                <select onChange={e=> handleSort(e)}>
                    <option >Alphabetical Order</option>
                    <option value="asc">Asc</option>
                    <option value="des">Des</option>
                </select>
                <select onChange={e => handleScore(e)}>
                    <option >Order by Health Score</option>
                    <option value="ascHs">Max HS</option>
                    <option value="desHs">Min HS</option>
                </select>
                <select onChange={e=> handleFilterDiet(e)}>
                    <option value="s" disabled>Order by Diet Type</option>
                    <option value="All">All</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto-vegetarian">Lacto-Vegetarian</option>
                    <option value="ovo-vegetarian">Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Low FODMAP</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>                   
                </select> 
            </div>
            <Pagination
           showPerPage={showPerPage}
           allRecipes={allRecipes.length}
           pagination={pagination}
           page={page}></Pagination>

            {
                showRecipes?.map((el)=>{
                    return (
                        <div key={el.id}>
                        <RecipeCard key={el.id} id={el.id} title={el.title} diets={el.diets} healthScore={el.healthScore} image={el.image}/>                     
                        </div>
                    ) 
                })    
            }
            
        </div>
    )
}

export default Home;

