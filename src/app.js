import express from "express";
import connect from "./database/connection.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

// server
const app = express();
app.set("trust proxy", 1);

// database
connect();

// settings
dotenv.config();
app.set("PORT", process.env.PORT || 3000);

// middlewares
app.use(express.json());
app.use(
  cors({ origin: "https://app-fullstack.onrender.com", credentials: true })
);
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

export default app;
