import request from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import app from "../app.js";
import User from "../models/user.model.js";

dotenv.config();

describe("POST /api/projects", () => {
  let managerToken;
  let memberToken;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const manager = await User.create({
      firstName: "Test",
      lastName: "Manager",
      email: "manager-test@example.com",
      password: "12345678",
      role: "manager",
    });

    const member = await User.create({
      firstName: "Test",
      lastName: "Member",
      email: "member-test@example.com",
      password: "12345678",
      role: "member",
    });

    managerToken = jwt.sign(
      {
        id: manager._id,
        role: manager.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    memberToken = jwt.sign(
      {
        id: member._id,
        role: member.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
  });

  afterAll(async () => {
    await User.deleteMany({
      email: {
        $in: [
          "manager-test@example.com",
          "member-test@example.com",
        ],
      },
    });

    await mongoose.connection.close();
  });

  it("should create a project for manager", async () => {
    const response = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({
        name: "Test Project",
        description: "Project created by test",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("Test Project");
  });

  it("should reject project creation for member", async () => {
    const response = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        name: "Member Project",
        description: "Should not be created",
      });

    expect(response.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });

  it("should reject invalid project data", async () => {
    const response = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({
        description: "Missing project name",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});