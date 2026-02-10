const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Category = require("../src/models/CategoryModel");

jest.setTimeout(20000);

describe("Update Expense Flow", () => {

  let token;
  let userId;
  let expenseId;
  let categoryId;

  const testUser = {
    name: "Update Test User",
    email: `update_${Date.now()}@mail.com`,
    password: "Password123"
  };

  beforeAll(async () => {

    const signupRes = await request(app).post("/api/user").send(testUser);
    userId = signupRes.body.user?._id || signupRes.body.data?._id;

    const loginRes = await request(app).post("/api/user/login").send({
      email: testUser.email,
      password: testUser.password
    });

    token = loginRes.body.token;

    const category = await Category.create({
      name: "Update Category",
      type: "expense"
    });

    categoryId = category._id;

    const expenseRes = await request(app)
      .post("/api/expense")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userID: userId,
        categoryID: categoryId,
        amount: 200,
        date: new Date(),
        description: "Before update"
      });

    expenseId = expenseRes.body.data._id;
  });

  test("Owner can update expense", async () => {

    const res = await request(app)
      .put(`/api/expense/${expenseId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 999,
        description: "After update"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.amount).toBe(999);
    expect(res.body.data.description).toBe("After update");
  });

  afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.db.dropDatabase();
      await mongoose.connection.close();
    }
  });

});
