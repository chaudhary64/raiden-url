import { verifyAccessToken } from "../utils/tokens.js";

const authenticateMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Header must be present and start with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }

  // Attach the decoded user payload so controllers can access req.user
  req.user = decoded;

  next();
};

export default authenticateMiddleware;
