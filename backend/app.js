"use strict";

/** Express app for Who's Hungry?. */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { authenticateJWT } = require("./middleware/auth")
const { NotFoundError } = require('./expressError');

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
  });
  
  /** Generic error handler; anything unhandled goes here. */
  app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });
  
  module.exports = app;