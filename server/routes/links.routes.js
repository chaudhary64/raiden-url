import express from "express";
import getLinkController from "../controllers/link/get.controller.js";
import postLinkController from "../controllers/link/create.controller.js";
import removeLinkController from "../controllers/link/delete.controller.js";
import editLinkController from "../controllers/link/edit.controller.js";
import authenticateMiddleware from "../middlewares/authenticate.middleware.js";

const linkRouter = express.Router();

// All link routes require authentication
linkRouter.use(authenticateMiddleware);

linkRouter.get("/all", getLinkController);
linkRouter.post("/", postLinkController);
linkRouter.put("/edit", editLinkController);
linkRouter.delete("/delete", removeLinkController);

export default linkRouter;

