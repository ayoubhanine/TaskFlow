import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TaskFlow API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

export default app;