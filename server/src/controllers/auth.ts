import { RequestHandler } from "express";
import AuthVerificationTokenModel from "src/models/AuthVerificationToken";
import UserModel from "src/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { sendErrorRes } from "src/utils/helper";
import jwt from "jsonwebtoken";
import mail from "src/utils/mail";

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
  const link = `http://localhost:3000/verify.html?id=${newUser._id}&token=${token}`;

  // Looking to send emails in production? Check out our Email API/SMTP product
  // const transport = nodemailer.createTransport({
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "9e7fec9eabe457",
  //     pass: "924670c6802ce4",
  //   },
  // });
  // await transport.sendMail({
  //   from: "verification@myapp.com",
  //   to: newUser.email,
  //   html: `<h1>Please click on <a href=${link}>this link</a> to verify your account<h1>`,
  // });
  await mail.sendVerification(newUser.email, link);
  res.json({ message: "Please check your inbox" });
};

export const verifyEmail: RequestHandler = async (req, res) => {
  const id = req.body.id as string;
  const token = req.body.token as string;

  const authToken = await AuthVerificationTokenModel.findOne({ owner: id });
  if (!authToken) return sendErrorRes(res, "Unauthorized request!", 403);
  const isMatched = await authToken.compareToken(token);
  if (!isMatched)
    return sendErrorRes(res, "Unauthorized request, invalid token!", 403);
  await UserModel.findByIdAndUpdate(id, { verified: true });
  await AuthVerificationTokenModel.findByIdAndDelete(authToken._id);
  res.json({ message: "Thanks for joining us, your email is verified!" });
};

export const generateVerificationLink: RequestHandler = async (req, res) => {
  const { id, email } = req.user;
  const token = crypto.randomBytes(36).toString("hex");
  const link = `http://localhost:3000/verify.html?id=${id}&token=${token}`;

  await AuthVerificationTokenModel.findOneAndDelete({ owner: id });

  await AuthVerificationTokenModel.create({ owner: id, token });
  await mail.sendVerification(email, link);
  res.json({ message: "Please check your inbox" });
};

export const grantAccessToken: RequestHandler = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) sendErrorRes(res, "Unauthorized request", 403);
  const payload = jwt.verify(refreshToken, "secret") as { id: string };
  if (!payload.id) sendErrorRes(res, "Unauthorized request", 401)
    const user = await UserModel.findOne({
      _id: payload.id,
      tokens: refreshToken,
    });
    if (!user) {
      await UserModel.findByIdAndUpdate(payload.id, { tokens: [] });
      return sendErrorRes(res, "Unauthorized request", 401);
    }
    const newAccessToken = jwt.sign({id:user._id}, "secret", {
      expiresIn: "15m",
    });
    const newRefreshToken = jwt.sign({id:user._id}, "secret");

    user.tokens = user.tokens.filter((t) => t!== refreshToken)
    user.tokens.push(newRefreshToken)
    await user.save()
    res.json({
      tokens:{
        refresh: newRefreshToken,
        access: newAccessToken
      }
    })

};
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return sendErrorRes(res, "Invalid email!", 403);
  const isMacthed = await user.comparePassword(password);
  if (!isMacthed) return sendErrorRes(res, "InvalidPassword", 422);

  const payload = { id: user._id };
  const accessToken = jwt.sign(payload, "secret", {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, "secret");
  if (!user.tokens) {
    user.tokens = [refreshToken];
  } else {
    user.tokens.push(refreshToken);
  }
  await user.save();
  res.json({
    profile: {
      id: user._id,
      email: user.email,
      name: user.name,
      tokens: { refresh: refreshToken, access: accessToken },
    },
  });
};

export const sendProfile: RequestHandler = async (req, res) => {
  res.json({ profile: req.user });
};
