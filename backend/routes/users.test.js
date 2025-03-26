"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const { commonAfterAll,
    commonAfterEach, 
    commonBeforeAll, 
    commonBeforeEach } = require('./_testCommon.js')

    beforeAll(commonBeforeAll);
    beforeEach(commonBeforeEach);
    afterEach(commonAfterEach);
    afterAll(commonAfterAll);

describe('POST /users', function() {
    it('can create a users', async () => {
        const resp = await request(app)
        .post('/users')
        .send({
            username: "new_user1",
            password: "password-new",
            firstName: "Test",
            lastName: "New-User",
            email: "new@email.com",
            isAdmin: false,
        });
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            user: {
              username: "new_user1",
              firstName: "Test",
              lastName: "New-User",
              email: "new@email.com",
              isAdmin: false,
            }, token: expect.any(String),
          });
    })
})



describe("GET /users", function () {
    it("gets users", async function () {
      const resp = await request(app)
          .get("/users")
      expect(resp.body).toEqual({
        users: [
          {
            username: "u1",
            firstName: "U1F",
            lastName: "U1L",
            email: "user1@user.com",
            isAdmin: false,
          },
          {
            username: "u2",
            firstName: "U2F",
            lastName: "U2L",
            email: "user2@user.com",
            isAdmin: false,
          },
          {
            username: "u3",
            firstName: "U3F",
            lastName: "U3L",
            email: "user3@user.com",
            isAdmin: false,
          },
        ],
      });
    });
})


