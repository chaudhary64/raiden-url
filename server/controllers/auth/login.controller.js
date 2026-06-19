import { createSession } from "../../repositories/session.repository.js";
import { getUserByEmail } from "../../repositories/user.repository.js";
import { cookieOptions } from "../../utils/cookie.js";
import { comparePassword } from "../../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokens.js";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    const isPasswordValid =
      user && (await comparePassword(password, user.password));

    if (!user || !isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const refreshToken = generateRefreshToken(user); // Implement this function to generate a refresh token
    const accessToken = generateAccessToken(user); // Implement this function to generate an access token

    const session = await createSession({
      user_id: user.id,
      refresh_token: refreshToken,
      user_agent: req.headers["user-agent"] || "unknown",
    });

    res.status(201).cookie("refresh_token", refreshToken, cookieOptions).json({
      message: "User created successfully",
      user: user,
      accessToken,
      refreshToken,
    });

    res.status(200).json({ message: "Login successful", user, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default loginController;
