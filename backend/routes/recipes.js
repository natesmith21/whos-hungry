"use strict";

const express = require('express');
const Spoonacular = require('../models/Spoonacular');

const router = express.Router();

router.get('/random', async (req, res, next) => {
    try {
        const recipe = await Spoonacular.getRandom();
        console.log(recipe);
        return res.json({ recipe });
    } catch (e) {
        return next(e);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const recipe = await Spoonacular.getRecipe(req.params.id);
        return res.json({ recipe });
    } catch (e) {
        return next(e);
    }
});

router.get('/search/:terms', async (req, res, next) => {
    try {
        const recipes = await Spoonacular.searchRecipes(req.params.terms);
        return res.json({ recipes });
    } catch (e) {
        return next(e);
    }
});

module.exports = router;