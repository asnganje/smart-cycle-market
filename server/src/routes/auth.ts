import express from "express";
import { generateVerificationLink, login, sendProfile, sign_up, verifyEmail } from "src/controllers/auth";
import { isAuth } from "src/middleware/auth";
import validate from "src/middleware/validator";
import { NewUserSchema, VerifyTokenSchema } from "src/utils/validationSchema";

const authRouter = express.Router();

authRouter.route("/sign-up").post(validate(NewUserSchema), sign_up);
authRouter.route("/verify").post(validate(VerifyTokenSchema), verifyEmail);
authRouter.route("/login").post(login);
authRouter.route("/verify-token").get(isAuth, generateVerificationLink);
authRouter.route("/profile").get(isAuth, sendProfile);

export default authRouter;
