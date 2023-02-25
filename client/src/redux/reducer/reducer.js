import { GET_ALL_RECIPES, FILTER_BY_DIET, ORDER_BY_NAME, GET_RECIPE_BY_NAME, GET_DIETS, GET_RECIPE_DETAIL, CLEAR_STATE, ORDER_BY_HS} from "../actions/actions";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case FILTER_BY_DIET:
            const allRecipes = state.allRecipes
            const filtered = action.payload === 'All' ? allRecipes : allRecipes.filter(el => el.diets.includes(action.payload))
            return{
                ...state,
                recipes: filtered
            }
        case ORDER_BY_NAME:
            const allRe = state.allRecipes
            const order = action.payload === "asc" ? allRe.sort(function (a, b){
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
                else return -1
            }) :
            allRe.sort(function(a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
               else return -1
              })

            return{
                ...state,
                recipes: order
            }
        case GET_RECIPE_BY_NAME:
            return{
                ...state,
                recipes: action.payload
            }
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                detail: action.payload

            }
        case CLEAR_STATE:
            return{
                ...state,
                detail: []
            } 
        case ORDER_BY_HS:
            const all = state.allRecipes
            const hs = action.payload === "desHs" ? all.sort(function(a, b){
                if (a.healthScore > b.healthScore) return 1;
                if (a.healthScore < b.healthScore) return -1;
                return 0;
            }): 
            all.sort(function (a, b){
                if (a.healthScore < b.healthScore) return 1;
                if (a.healthScore > b.healthScore) return -1;
                return 0;
            });
            return {
                ...state,
                recipes: hs
            }  
            
        default:
             return state;
    }

};

export default rootReducer;