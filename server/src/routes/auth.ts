import express from "express";
import { login, sign_up, verifyEmail } from "src/controllers/auth";
import validate from "src/middleware/validator";
import { NewUserSchema, VerifyTokenSchema } from "src/utils/validationSchema";

const authRouter = express.Router();

authRouter.route("/sign-up").post(validate(NewUserSchema), sign_up);
authRouter.route("/verify").post(validate(VerifyTokenSchema), verifyEmail);
authRouter.route("/login").post(login);

export default authRouter;
