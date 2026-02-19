import express from "express";
import { login, sign_up } from "src/controllers/auth";

const authRouter = express.Router();

authRouter.route("/sign-up").post(sign_up);
authRouter.route("/login").post(login);

export default authRouter;
