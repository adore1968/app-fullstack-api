import { Router } from "express";
import authRequired from "../middlewares/authRequired.middleware.js";
import {
  getTasksController,
  getTaskController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/tasks.controller.js";

const router = Router();

// queries
router.get("/", authRequired, getTasksController);
router.get("/:id", authRequired, getTaskController);

// mutations
router.post("/", authRequired, createTaskController);
router.put("/:id", authRequired, updateTaskController);
router.delete("/:id", authRequired, deleteTaskController);

export default router;
