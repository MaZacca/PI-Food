const { Router } = require("express");
const router = Router();
const { Diet } = require("../db.js");


router.get("/", async (req, res)=>{
    const defaultTypes = ["gluten free","ketogenic","vegetarian","lacto-vegetarian","ovo-vegetarian","vegan","pescetarian", "paleolithic","primal","low fodmap","whole 30","dairy free","lacto ovo vegetarian"];
   try {
    defaultTypes.forEach(el => {
        Diet.findOrCreate({
            where: {name: el}
        })
    })
    const allDiets = await Diet.findAll();
    res.status(200).send(allDiets)    
   } catch (error) {
    res.status(400).json(error)
   }
})

module.exports = router;