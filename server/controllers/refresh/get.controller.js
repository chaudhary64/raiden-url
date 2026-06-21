import { createSession, getSessionByRefreshToken, deleteSessionById } from "../../repositories/session.repository.js";
import generateTokens from "../../services/token.service.js";
import { verifyRefreshToken } from "../../utils/tokens.js";
import { cookieOptions } from "../../utils/cookie.js";

export default async function refreshController(req, res) {
  try {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = verifyRefreshToken(refresh_token);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    }

    // Validate the session exists in DB
    const session = await getSessionByRefreshToken(refresh_token);
    if (!session) {
      return res.status(401).json({ message: "Session not found" });
    }

    // Rotate tokens: delete old session, generate new pair, persist new session
    await deleteSessionById(session.session_id);
    const { accessToken, refreshToken } = generateTokens(decoded);

    await createSession({
      user_id: decoded.id,
      refresh_token: refreshToken,
      user_agent: req.headers["user-agent"] || "unknown",
    });

    res.status(200).cookie("refresh_token", refreshToken, cookieOptions).json({
      message: "Tokens refreshed successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}