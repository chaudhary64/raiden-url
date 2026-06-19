import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import linkRouter from "./routes/links.routes.js";
// import authenticateMiddleware from "./middlewares/authenticate.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(authenticateMiddleware); // Apply the authentication middleware to all routes

app.use("/auth", authRouter);

app.use("/links", linkRouter);

// GLOBAL ERROR HANDLER FOR ROUTES
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
