"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const { commonAfterAll,
    commonAfterEach, 
    commonBeforeAll, 
    commonBeforeEach,
    u1Token,
    u2Token,
    adminToken
   } = require('./_testCommon.js')

    beforeAll(commonBeforeAll);
    beforeEach(commonBeforeEach);
    afterEach(commonAfterEach);
    afterAll(commonAfterAll);

describe('POST /users', function() {
    it('can create a users as admin', async () => {
        const resp = await request(app)
        .post('/users')
        .send({
            username: "new_user1",
            password: "password-new",
            firstName: "Test",
            lastName: "New-User",
            email: "new@email.com",
            isAdmin: false,
        })
        .set("authorization", `Bearer ${adminToken}`)
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
    });
    it("can create admin users as admin", async function () {
      const resp = await request(app)
          .post("/users")
          .send({
            username: "u-new",
            firstName: "First-new",
            lastName: "Last-newL",
            password: "password-new",
            email: "new@email.com",
            isAdmin: true,
          })
          .set("authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toEqual(201);
      expect(resp.body).toEqual({
        user: {
          username: "u-new",
          firstName: "First-new",
          lastName: "Last-newL",
          email: "new@email.com",
          isAdmin: true,
        }, token: expect.any(String),
      });
    });
  
    it("is unauth for non-admin", async function () {
      const resp = await request(app)
          .post("/users")
          .send({
            username: "u-new",
            firstName: "First-new",
            lastName: "Last-newL",
            password: "password-new",
            email: "new@email.com",
            isAdmin: true,
          })
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(401);
    });
  
    it("is unauth for anon", async function () {
      const resp = await request(app)
          .post("/users")
          .send({
            username: "u-new",
            firstName: "First-new",
            lastName: "Last-newL",
            password: "password-new",
            email: "new@email.com",
            isAdmin: true,
          });
      expect(resp.statusCode).toEqual(401);
    });
  
    it("retuns bad request if missing data", async function () {
      const resp = await request(app)
          .post("/users")
          .send({
            username: "u-new",
          })
          .set("authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toEqual(400);
    });
  
    it("retuns bad request if invalid data", async function () {
      const resp = await request(app)
          .post("/users")
          .send({
            username: "u-new",
            firstName: "First-new",
            lastName: "Last-newL",
            password: "password-new",
            email: "not-an-email",
            isAdmin: true,
          })
          .set("authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toEqual(400);
    });
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
    it('gets a specified user', async function() {
      const resp = await request(app)
        .get("/users/u1")
      expect(resp.body).toEqual({
        user:
        {
          username: "u1",
          firstName: "U1F",
          lastName: "U1L",
          email: "user1@user.com",
          isAdmin: false,
        }
      })
    });

    // it("is unauth for anon", async function () {
    //   const resp = await request(app)
    //       .get("/users");
    //   expect(resp.statusCode).toEqual(401);
    // });

    // it("is unauth for anon", async function () {
    //   const resp = await request(app)
    //       .get("/users/u1");
    //   expect(resp.statusCode).toEqual(401);
    // });

    it("fails: test next() handler", async function () {
      // there's no normal failure event which will cause this route to fail ---
      // thus making it hard to test that the error-handler works with it. This
      // should cause an error, all right :)
      await db.query("DROP TABLE users CASCADE");
      const resp = await request(app)
          .get("/users")
          .set("authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toEqual(500);
    });
})

describe('PATCH /users/:username', function() {
  it('updates a specified user as admin', async function() {
    const resp = await request(app)
      .patch('/users/u1')
      .send({
        firstName: 'New'
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "New",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
      }
    })
  });

  it("updates a specified user as self", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          firstName: "New",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "New",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
      },
    });
  });

  it("is unauth if not same user", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          firstName: "New",
        })
        .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  it("is unauth for anon", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          firstName: "New",
        });
    expect(resp.statusCode).toEqual(401);
  });

  it("returns not found if no such user", async function () {
    const resp = await request(app)
        .patch(`/users/nope`)
        .send({
          firstName: "Nope",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });

  it("returns bad request if invalid data", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          firstName: 42,
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  it("works: can set new password as self", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          password: "new-password",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
      },
    });
    const isSuccessful = await User.authenticate("u1", "new-password");
    expect(isSuccessful).toBeTruthy();
  });
})

describe('DELETE /users/:username', function() {
  it('deletes a specified user as admin', async function () {
    const resp = await request(app)
    .delete(`/users/u1`)
    .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({ deleted: "u1" });
  });

  it("deletes a sepcified user as self", async function () {
    const resp = await request(app)
        .delete(`/users/u1`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ deleted: "u1" });
  });

  it("is unauth if not self", async function () {
    const resp = await request(app)
        .delete(`/users/u1`)
        .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  it("is unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });

  it("returns not found if user missing", async function () {
    const resp = await request(app)
        .delete(`/users/nope`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });
})
