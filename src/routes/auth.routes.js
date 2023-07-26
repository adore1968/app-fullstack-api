import { Router } from "express";
import {
  profileController,
  registerController,
  loginController,
  logoutController,
  verifyToken,
} from "../controllers/auth.controller.js";
import authRequired from "../middlewares/authRequired.middleware.js";

const router = Router();

// queries
router.get("/profile", authRequired, profileController);

// mutations
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/verify", verifyToken);

export default router;
