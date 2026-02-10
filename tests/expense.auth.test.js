const request = require("supertest");
const app = require("../app");

describe("Expense Routes Auth Protection", () => {
  test("GET /api/expenses should return 401 without token", async () => {
    const res = await request(app).get("/api/expenses");
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/NO token/i);
  });

  test("GET /api/expenses should return 403 with invalid token", async () => {
    const res = await request(app)
      .get("/api/expenses")
      .set("Authorization", "Bearer invalidtoken123");

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/Invalid|expired/i);
  });
});


afterAll(async () => {
  if (mongoose.connection && mongoose.connection.readyState !== 0) {
    await mongoose.connection.close(true);
  }
});