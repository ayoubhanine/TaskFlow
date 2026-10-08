import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import app from "../app.js";
import User from "../models/user.model.js";

dotenv.config();

describe("POST /api/auth/login", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("12345678", 10);

    await User.create({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: hashedPassword,
      role: "member",
    });
  });

  afterAll(async () => {
    await User.deleteOne({
      email: "test@example.com",
    });

    await mongoose.connection.close();
  });

  it("should login with valid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "12345678",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
  });

  it("should reject invalid password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword",
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});