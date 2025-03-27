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

module.exports = router;