import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

export async function register({ name, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError("Email is already registered", 409);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = generateAccessToken({ id: user._id, email: user.email });
  const refreshToken = generateRefreshToken({ id: user._id, email: user.email });
  const { password: _, ...userWithoutPassword } = user.toObject();
  return { user: userWithoutPassword, token, refreshToken };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError("Invalid credentials!", 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError("Invalid credentials!", 401);

  const token = generateAccessToken({ id: user._id, email: user.email });
  const refreshToken = generateRefreshToken({ id: user._id, email: user.email });
  const { password: _, ...userWithoutPassword } = user.toObject();
  return { user: userWithoutPassword, token, refreshToken };
}

export async function profile(userId) {
  const user = await User.findById(userId).select("-password");
  if (!user)  throw new ApiError("User not found!", 404);
  return user;
}
