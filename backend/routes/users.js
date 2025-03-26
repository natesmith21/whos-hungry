/**User Routes */

"use strict";

const express = require('express');
const jsonschema = require('jsonschema');
const User = require('../models/user');
const { BadRequestError } = require('../expressError');
const { createToken } = require('../helpers/tokens');
const newUserSchema =  require('../schema/userNew.json');
const updateUserSchema = require('../schema/userUpdate.json')

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


router.post('/', async (req, res, next) => {
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


router.patch('/:username', async (req, res, next) => {
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
})


module.exports = router;