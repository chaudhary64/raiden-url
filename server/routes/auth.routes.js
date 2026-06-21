import express from "express";
import loginController from "../controllers/auth/login.controller.js";
import signupController from "../controllers/auth/signup.controller.js";
import { updateInfoController } from "../controllers/auth/update.controller.js";
import { deleteUserController } from "../controllers/auth/delete.controller.js";
import authenticateMiddleware from "../middlewares/authenticate.middleware.js";

const authRouter = express.Router();

// Public routes — no token required
authRouter.post("/login", loginController);
authRouter.post("/signup", signupController);

// Protected routes — valid access token required
authRouter.put("/user", authenticateMiddleware, updateInfoController);
authRouter.delete("/user", authenticateMiddleware, deleteUserController);

export default authRouter;

