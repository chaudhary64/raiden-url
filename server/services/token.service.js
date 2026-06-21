import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";

/**
 * Generates a new access token and refresh token for a given user.
 * @param {object} user - The user object (must have id and email).
 * @returns {{ accessToken: string, refreshToken: string }}
 */
export default function generateTokens(user) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken };
}
