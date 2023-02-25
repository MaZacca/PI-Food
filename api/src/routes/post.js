const { Router } = require("express");
const { Recipe, Diet } = require("../db");

const router = Router();

router.post("/", async (req, res) => { 
    try {
        let { title, summary, healthScore, typeOfDiet, instructions, image } = req.body;
        let newRecipe = await Recipe.create({ title, summary, healthScore, instructions, image });
        let dietDB = await Diet.findAll({
            where: { name: typeOfDiet }    
        })
        newRecipe.addDiet(dietDB)
        return res.status(200).json(newRecipe);        
    } catch (error) {
        res.status(400).send("Ha ocurrido un error")
    }
   
});

module.exports = router;
