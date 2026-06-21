import { createUser } from "../../repositories/user.repository.js";
import { hashPassword } from "../../utils/hash.js";
import { createSession } from "../../repositories/session.repository.js";
import { cookieOptions } from "../../utils/cookie.js";
import generateTokens from "../../services/token.service.js";

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    const createdUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    const { refreshToken, accessToken } = generateTokens(createdUser);

    await createSession({
      user_id: createdUser.id,
      refresh_token: refreshToken,
      user_agent: req.headers["user-agent"] || "unknown",
    });

    res.status(201).cookie("refresh_token", refreshToken, cookieOptions).json({
      message: "User created successfully",
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
