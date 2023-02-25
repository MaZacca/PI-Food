const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipe = require("./recipe.js")
const diet = require("./diet.js")
const post = require("./post.js")  

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipe);
router.use('/diets', diet);
router.use('/post', post);

module.exports = router;
 