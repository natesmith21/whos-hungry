'use strict';

const db = require('../db');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');
const { v4: uuidv4 } = require('uuid');
const { NotFoundError, UnauthorizedError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');


class User {

    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT username, 
            password
            FROM users
            WHERE username = $1`,
            [username]
        );  

        const user = result.rows[0];
        console.log('db', db);

        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                delete user.password;
                return user;
            } else {
                throw new UnauthorizedError('Password Incorrect');
            }
        }
    }

    static async findAll(){
        const result = await db.query(
            `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin"
            FROM users`
        );
        return result.rows;
    }

    static async get(username) {
        const res = await db.query(
            `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
            [username]
        );

        const user = res.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        return user;
    }

    static async register(
        {username, password, firstName, lastName, email, isAdmin}) {
            const dupeCheck = await db.query(
                `SELECT username
                FROM users
                WHERE username = $1`,
             [username],
            );

            if (dupeCheck.rows[0]) {
                throw new BadRequestError(`Username ${username} taken, please choose another`);
            }
            const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
            const user_id = uuidv4();

            const result = await db.query(
                  `INSERT INTO users
                   (id,
                    username,
                    password,
                    first_name,
                    last_name,
                    email,
                    is_admin)
                   VALUES ($1, $2, $3, $4, $5, $6, $7)
                   RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
                [
                  user_id,
                  username,
                  hashedPassword,
                  firstName,
                  lastName,
                  email,
                  isAdmin,
                ],
            );
        
            const user = result.rows[0];
        
            return user;
            
        }

    static async update(username, data) {
            if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

        const {setCols, values} = sqlForPartialUpdate(
            data, 
            {
                firstName: "first_name",
                lastName: "last_name",
                isAdmin: "is_admin",
            });
        const usernameIdx = '$' + (values.length + 1);

        const query = `UPDATE users 
                        SET ${setCols}
                        WHERE username = ${usernameIdx}
                        RETURNING username,
                            first_name AS "firstName",
                            last_name AS "lastName",
                            email,
                            is_admin AS "isAdmin"`;
        
        const result = await db.query(query, [...values, username]);
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        delete user.password;
        return user;
    }

    static async remove(username) {
        let result = await db.query(
            `DELETE 
            FROM users
            WHERE username = $1
            returning username`,
            [username]
        );

        const user = result.rows[0];

        if(!user) throw new NotFoundError(`No user: ${username}`);

        return user;
    }


    /** Recipe Box  */

    static async getSavedRecipes(user_id) {
        const list = await db.query(
            `SELECT recipe_id as "recipeId"
            FROM saved_recipes
            WHERE username = $1`,
            [user_id]);
        
        const recipeList= [];

        for (let r of list.rows){
            recipeList.push(r.recipeId);
        } 

        const result = await db.query(
            `SELECT username,
                    recipe_id as "id",
                    recipe_title as "title",
                    recipe_folder as "recipeFolder",
                    made_it as "madeRecipe",
                    rating
            FROM saved_recipes
            WHERE username = $1`, 
            [user_id]);
        
        if (!list) throw new NotFoundError('No Saved Recipes');

        const saved_recipes = {recipesList: recipeList,
                               recipesInfo: result.rows
                            };

        return saved_recipes;
    } 

    static async postSavedRecipe({username, recipeId, recipeTitle, recipeFolder}){
        const dupeCheck = await db.query(
            `SELECT recipe_id
            FROM saved_recipes
            WHERE username = $1
            AND recipe_id = $2`,
         [username, recipeId],
        );

        if (dupeCheck.rows[0]) {
            throw new BadRequestError(`You've already saved this recipe - see it <a>here</a>`);
        }

        let result = await db.query(
            `INSERT INTO saved_recipes
            (username, recipe_id, recipe_title, recipe_folder)
            VALUES ($1, $2, $3, $4)
            RETURNING username, recipe_id AS "recipeID"`, 
            [username,recipeId, recipeTitle, recipeFolder]
        );

        const saved = result.rows[0];
        return saved;
    }

    static async removeSavedRecipe({username, recipeId}) {
        let result = await db.query(
            `DELETE 
            FROM saved_recipes
            WHERE username = $1
            AND 
            recipe_id = $2
            returning recipe_id`,
            [username, recipeId]
        );

        const recipe = result.rows[0];

        if(!recipe) throw new NotFoundError(`Recipe not previously saved`);

        return recipe;
    }
}

module.exports = User;
