import request from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import app from "../app.js";
import User from "../models/user.model.js";
import Project from "../models/project.model.js";

dotenv.config();

describe("POST /api/tasks", () => {
  let managerToken;
  let memberToken;
  let projectId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const manager = await User.create({
      firstName: "Task",
      lastName: "Manager",
      email: "task-manager@example.com",
      password: "12345678",
      role: "manager",
    });

    const member = await User.create({
      firstName: "Task",
      lastName: "Member",
      email: "task-member@example.com",
      password: "12345678",
      role: "member",
    });

    const project = await Project.create({
      name: "Task Test Project",
      description: "Project for task tests",
      owner: manager._id,
    });

    projectId = project._id;

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
    await Project.deleteOne({
      _id: projectId,
    });

    await User.deleteMany({
      email: {
        $in: [
          "task-manager@example.com",
          "task-member@example.com",
        ],
      },
    });

    await mongoose.connection.close();
  });

  it("should create a task for manager", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({
        title: "Test Task",
        description: "Task created by test",
        priority: "high",
        project: projectId,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe("Test Task");
  });

  it("should reject task creation for member", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        title: "Member Task",
        project: projectId,
      });

    expect(response.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });

  it("should reject invalid task data", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({
        description: "Missing title and project",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});