import { RequestHandler } from "express";
import AuthVerificationTokenModel from "src/models/AuthVerificationToken";
import UserModel from "src/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { sendErrorRes } from "src/utils/helper";

export const sign_up: RequestHandler = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name) return sendErrorRes(res, "Name is missing", 422);
    if (!email) return sendErrorRes(res, "Email is missing", 422);
    if (!password) return sendErrorRes(res, "Password is missing", 422);
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      sendErrorRes(res, "Email is already in use", 401);
    }
    const newUser = await UserModel.create({ name, email, password });
    const token = crypto.randomBytes(36).toString("hex");
    await AuthVerificationTokenModel.create({ owner: newUser._id, token });
    const link = `http://localhost:3000/verify?id${newUser._id}&token=${token}`;

    // Looking to send emails in production? Check out our Email API/SMTP product
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9e7fec9eabe457",
        pass: "924670c6802ce4",
      },
    });
    await transport.sendMail({
      from: "verification@myapp.com",
      to: newUser.email,
      html: `<h1>Please click on <a href=${link}>this link</a> to verify your account<h1>`,
    });
    res.json({ message: "Please check your inbox" });
};

export const verifyEmail: RequestHandler = async(req, res) => {
  const id = req.body.id as string
  const token = req.body.token as string 

  const authToken = await AuthVerificationTokenModel.findOne({owner: id})
  if (!authToken) return sendErrorRes(res, "Unauthorized request!", 403)
  const isMatched = await authToken.compareToken(token)
  if (!isMatched) return sendErrorRes(res, "Unauthorized request, invalid token!", 403)
  await UserModel.findByIdAndUpdate(id, {verified: true})
  await AuthVerificationTokenModel.findByIdAndDelete(authToken._id)
  res.json({message:"Thanks for joining us, your email is verified!"})
}

export const login: RequestHandler = (req, res) => {
  res.json({ message: "Auth login route" });
};
