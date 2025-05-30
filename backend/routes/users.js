/**User Routes */

"use strict";

const express = require('express');
const jsonschema = require('jsonschema');
const User = require('../models/user');
const { BadRequestError } = require('../expressError');
const { createToken } = require('../helpers/tokens');
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const newUserSchema =  require('../schema/userNew.json');
const updateUserSchema = require('../schema/userUpdate.json');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        return res.json({ users });
    } catch (e) {
        return next(e);
    }
});

router.get('/:username', async (req, res, next) => {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (e) {
        return next(e);
    }
});


router.post('/', ensureAdmin, async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, newUserSchema);
        if (!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.register(req.body);
        const token = createToken(user);
        return res.status(201).json({user, token});
    } catch (e) {
        return next(e);
    }
});


router.patch('/:username', ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, updateUserSchema);
        if (!validator.valid) {
          const errs = validator.errors.map(e => e.stack);
          throw new BadRequestError(errs);
        }
    
        const user = await User.update(req.params.username, req.body);
        return res.json({ user });
      } catch (err) {
        return next(err);
      }
});

router.delete('/:username', ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        const user = await User.remove(req.params.username);
        return res.json({ deleted: user.username });
    } catch (e) {
        return next(e);
    }
});


/**get a users saved recipes */
router.get('/:username/saved', ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        const saved = await User.getSavedRecipes(req.params.username);
        return res.json({ saved });
    } catch (e) {
        return next(e);
    }
})

/**deletes a users saved recipe */
router.delete('/:username/:recipeId', ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        const recipe = await User.removeSavedRecipe({username: req.params.username, recipeId: req.params.recipeId});
        return res.json({removed: recipe.recipe_id}); 
    } catch (e) {
        return next(e);
    }

});



module.exports = router;