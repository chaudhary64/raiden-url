import { deleteSessionByRefreshToken } from "../../repositories/session.repository.js";
import { cookieOptions } from "../../utils/cookie.js";

const logoutController = async (req, res, next) => {
  const token = req.cookies.refresh_token;
  if (!token) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  await deleteSessionByRefreshToken(token);

  res.clearCookie("refresh_token", cookieOptions);
  return res.status(200).json({ message: "Logged out successfully" });
};

export default logoutController;
