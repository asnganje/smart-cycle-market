import express from "express";
import {
  generateForgetPassLink,
  generateVerificationLink,
  grantAccessToken,
  grantValid,
  login,
  sendProfile,
  sign_up,
  signOut,
  updatePassword,
  updateProfile,
  verifyEmail,
} from "src/controllers/auth";
import { isAuth, isValidPassResetToken } from "src/middleware/auth";
import validate from "src/middleware/validator";
import {
  NewUserSchema,
  ResetPasswordSchema,
  VerifyTokenSchema,
} from "src/utils/validationSchema";

const authRouter = express.Router();

authRouter.route("/sign-up").post(validate(NewUserSchema), sign_up);
authRouter.route("/verify").post(validate(VerifyTokenSchema), verifyEmail);
authRouter.route("/login").post(login);
authRouter.route("/verify-token").get(isAuth, generateVerificationLink);
authRouter.route("/profile").get(isAuth, sendProfile);
authRouter.route("/refresh-token").post(grantAccessToken);
authRouter.route("/sign-out").post(isAuth, signOut);
authRouter.route("/forget-pass").post(generateForgetPassLink);
authRouter
  .route("/verify-pass-reset-token")
  .post(validate(VerifyTokenSchema), isValidPassResetToken, grantValid);
authRouter
  .route("/reset-pass")
  .post(validate(ResetPasswordSchema), isValidPassResetToken, updatePassword);
authRouter
  .route("/update-profile")
  .patch(isAuth, updateProfile);

export default authRouter;
