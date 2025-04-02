"use strict";

const express = require('express');
const jsonschema = require('jsonschema');
const Spoonacular = require('../models/Spoonacular');
const User = require('../models/user');
const recipeSchema = require('../schema/recipeSave.json');
const { BadRequestError } = require('../expressError');


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
        const recipes = await Spoonacular.searchRecipes(req.params.terms, req.query);
        return res.json({ recipes });
    } catch (e) {
        return next(e);
    }
});


/**save a recipe to a user */
router.post('/:recipe/save', async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, recipeSchema);
        if (!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const recipe = await User.postSavedRecipe(req.body);
        return res.status(201).json({ recipe });
    } catch (e) {
        return next(e);
    }
})

module.exports = router;