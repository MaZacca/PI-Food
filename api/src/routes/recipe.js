const { Router } = require("express");
const router = Router();
const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;


//funciones controladoras
const getApi = async () =>{
    let apiRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`); //volver a poner &number=100

        apiData = await apiRecipe.data.results.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                diets: recipe.diets,
                image: recipe.image,             
            }
        })
    return apiData

};

const getDb = async ()=>{
    const dataDB = await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
    let response = await dataDB?.map(recipe => {
        return {
            id: recipe.id,
            title: recipe.title,
            summary: recipe.summary,
            instructions: recipe.instructions,
            healthScore: recipe.healthScore,
            image: recipe.image,
            diets: recipe.diets?.map(diet => diet.name),
        }
    });

return response;
}
 
const getAllData = async () =>{
    const api = await getApi();
    const db = await getDb();
    const allData = api.concat(db)
    

    return allData;
}

//esta ruta es para mostrar todas, o la que busquemos por query
router.get("/", async (req, res) => {
    try {
        const { title } = req.query
        const allRecipes = await getAllData();
        if (title) {
            let recipeTitle = await allRecipes.filter(el => el.title.toLowerCase().includes(title.toLowerCase()))
            if (recipeTitle.length) {
                let recipes = recipeTitle.map(e => {
                    return {
                        id: e.id,
                        title: e.title,
                        diets: e.typeOfDiet ? e.typeOfDiet : e.diets.map(e => e.name),
                        healthScore: e.healthScore,
                        image: e.image
                    }

                })
                return res.status(200).send(recipes)
            }
            return res.status(404).send("Recipe not found")
        } else {
            let recipes = allRecipes.map(e => {
                return {
                    id: e.id,
                    title: e.title,
                    diets: e.typeOfDiet ? e.typeOfDiet.map(e => e) : e.diets.map(e => e),
                    healthScore: e.healthScore,
                    image: e.image,
                }
            })
            return res.status(200).send(recipes)
        }
    } catch (error) {
        return res.status(400).send("Error")
    }
});

// esta es para ir al detalle
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if (id.length > 8) { // para saber si es id de DB

            const dbRecipe = await Recipe.findOne({
                where: { id: id },
                include: {
                    model: Diet,
                    atributes: ["name"],
                    through: {
                        attributes: [],
                        },
                    },
            });
           
            if(dbRecipe){
                const format = {
                    id: dbRecipe.id,
                    title: dbRecipe.title,
                    summary: dbRecipe.summary,
                    healthScore: dbRecipe.healthScore,
                    image: dbRecipe.image,
                    instructions: dbRecipe.instructions,
                    diets: dbRecipe.diets?.map(diet => diet.name)
                }
                return res.status(200).json(format);     
            }
    
        } else {
            const apiRecipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`);

            if (apiRecipe.data.id) {
                let apiFormat = {
                    id: apiRecipe.data.id,
                    title: apiRecipe.data.title,
                    summary: apiRecipe.data.summary,
                    healthScore: apiRecipe.data.healthScore,
                    diets: apiRecipe.data.diets,
                    image: apiRecipe.data.image,
                    instructions: apiRecipe.data.analyzedInstructions[0].steps.map(el => {
                        return el.step                        
                    })
                }
                return res.status(200).send(apiFormat);
            }
        }
    } catch (error) {
        return res.status(404).send("Not Found");
    }
});


module.exports = router;