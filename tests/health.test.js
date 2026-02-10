const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
describe("GET /health", () => {
  it("should return status 200 and status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

afterAll(async () => {
  if (mongoose.connection && mongoose.connection.readyState !== 0) {
    await mongoose.connection.close(true);
  }
});