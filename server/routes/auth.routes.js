import express from "express";
import loginController from "../controllers/auth/login.controller.js";
import signupController from "../controllers/auth/signup.controller.js";
import { updateInfoController } from "../controllers/auth/update.controller.js";
import { deleteUserController } from "../controllers/auth/delete.controller.js";

const authRouter = express.Router();

authRouter.post("/login", loginController);

authRouter.post("/signup", signupController);

authRouter.put("/user", updateInfoController);

authRouter.delete("/user", deleteUserController);

export default authRouter;
