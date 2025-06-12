import jwt from "jsonwebtoken";
import { login, profile, register } from "../services/auth.service.js";
import { generateAccessToken } from "../utils/generateToken.js";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export async function registerController(req, res, next) {
  try {
    const { user, token, refreshToken } = await register(req.body);
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ user, token });
  } catch (error) {
    next(error);
  }
}

export async function loginController(req, res, next) {
  const { email, password } = req.body;
  try {
    const { user, token, refreshToken } = await login({ email, password });
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ user, token });
  } catch (error) {
    next(error);
  }
}

export async function profileController(req, res, next) {
  const { id } = req.user;
  try {
    const user = await profile(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export function refreshTokenController(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found, login again." });
    }

    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token, login again." });
      }

      const newAccessToken = generateAccessToken({ id: decoded.id, email: decoded.email });
      res.json({ token: newAccessToken });
    });
  } catch (error) {
    next(error);
  }
}

export function logoutController (req, res, next) {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ message: "Logged out Successfully" });
  } catch (error) {
    next(error);
  }
};
