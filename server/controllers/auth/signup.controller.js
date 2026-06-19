import { createUser } from "../../repositories/user.repository.js";
import { hashPassword } from "../../utils/hash.js";
import { generateRefreshToken, generateAccessToken } from "../../utils/tokens.js";
import { createSession } from "../../repositories/session.repository.js";
import { cookieOptions } from "../../utils/cookie.js";

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    const createdUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    const refreshToken = generateRefreshToken(createdUser); // Implement this function to generate a refresh token
    const accessToken = generateAccessToken(createdUser); // Implement this function to generate an access token

    const session = await createSession({
      user_id: createdUser.id,
      refresh_token: refreshToken,
      user_agent: req.headers["user-agent"] || "unknown",
    });

    res.status(201).cookie("refresh_token", refreshToken, cookieOptions).json({
      message: "User created successfully",
      rawPassword: password,
      user: createdUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res
      .status(409)
      .json({ message: "User already exists", error: error.message });
  }
};

export default signupController;
