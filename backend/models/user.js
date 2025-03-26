'use strict';

const db = require('../db');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');
const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');


class User {

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
}

module.exports = User;
