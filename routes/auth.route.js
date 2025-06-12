import { Router } from "express";
import { loginController, registerController, refreshTokenController, logoutController, profileController } from "../controllers/auth.controller.js";
import { loginValidation, registerValidation, validate } from "../middlewares/validation.middleware.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const authRouter = Router();

authRouter.post("/login", validate(loginValidation), loginController);
authRouter.post("/register", validate(registerValidation), registerController);
authRouter.post("/refresh-token", refreshTokenController);
authRouter.post("/logout", logoutController);
authRouter.get("/profile", authenticate, profileController);

export default authRouter;
