import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map(err => err.msg).join(", ");
      return next(new ApiError(errorMsgs, 400));
    }

    next();
  };
};

export const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const addPostValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("desc").notEmpty().withMessage("Desc is required"),
  body("image").notEmpty().withMessage("Image is required"),
];

export const editPostValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("desc").notEmpty().withMessage("Desc is required"),
];