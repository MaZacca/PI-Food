import axios from "axios";
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_RECIPE_BY_NAME = 'GET_RECIPE_BY_NAME';
export const GET_DIETS = 'GET_DIETS'
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const CLEAR_STATE = 'CLEAR_STATE';
export const ORDER_BY_HS = "ORDER_BY_HS";


export function getAllRecipes() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/recipes',{  
        });
        return dispatch({
            type: GET_ALL_RECIPES,
            payload: json.data
        })
    }
}

export function getDiets(){
    return async function(dispatch){
     var info = await axios.get('http://localhost:3001/diets', {
     });
     return dispatch({
        type: GET_DIETS,
        payload: info.data
     })
    }
}

export function createRecipe(data) {
    return async function (dispatch) {
       const post = await axios.post('http://localhost:3001/post', data);
       console.log(data)
       return post
    };
}

export function filterByDiet(payload) {
    return {
        type: FILTER_BY_DIET,
        payload      
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload      
    }
}

export function getRecipeByName(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/recipes?title='+ name)
            return dispatch({
                type: GET_RECIPE_BY_NAME,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    
    };
}

export function getRecipeDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/recipes/" + id)
            // console.log("json",json.data)
            return dispatch({
                type: GET_RECIPE_DETAIL,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function clearState() {
    return {
        type: CLEAR_STATE    
    }
}
export function orderByHS(payload) {
    return {
        type: ORDER_BY_HS,
        payload      
    }
}