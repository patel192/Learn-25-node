const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

jest.setTimeout(20000);

describe("Auth Flow", () => {

  let token;
  let userId;

  const testUser = {
    name: "Test User",
    email: `test_${Date.now()}@mail.com`,
    password: "Password123"
  };

  test("Signup user", async () => {
    const res = await request(app)
      .post("/api/user")
      .send(testUser);

    expect(res.statusCode).toBe(201);

    // Flexible extraction
    userId = res.body.user?._id || res.body.data?._id || res.body._id;
    expect(userId).toBeDefined();
  });

  test("Login user", async () => {
    const res = await request(app)
      .post("/api/user/login")
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.statusCode).toBe(200);

    token = res.body.token;
    expect(token).toBeDefined();
  });

  test("Access protected route", async () => {
    const res = await request(app)
      .get(`/api/user/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});

afterAll(async () => {
  if (mongoose.connection && mongoose.connection.readyState !== 0) {
    await mongoose.connection.close(true);
  }
});
