'use strict';

const db = require('../db');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');
const { v4: uuidv4 } = require('uuid');


class User {

    static async findAll(){
        const result = await db.query(
            `SELECT * FROM users`
        );
        return result.rows;
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
}

module.exports = User;
