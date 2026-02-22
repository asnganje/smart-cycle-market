import { RequestHandler } from "express";
import AuthVerificationTokenModel from "src/models/AuthVerificationToken";
import UserModel from "src/models/User";
import crypto from "crypto";
import dotenv from "dotenv";
import { sendErrorRes } from "src/utils/helper";
import jwt from "jsonwebtoken";
import mail from "src/utils/mail";
import PassResetTokenModel from "src/models/PasswordResetToken";
dotenv.config();

const VERIFICATION_LINK = process.env.VERIFICATION_LINK;
const JWT_SECRET = process.env.JWT_SECRET!;
const PASSWORD_RESET_LINK = process.env.PASSWORD_RESET_LINK;

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
  const link = `${VERIFICATION_LINK}?id=${newUser._id}&token=${token}`;

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
  const link = `${VERIFICATION_LINK}?id=${id}&token=${token}`;

  await AuthVerificationTokenModel.findOneAndDelete({ owner: id });

  await AuthVerificationTokenModel.create({ owner: id, token });
  await mail.sendVerification(email, link);
  res.json({ message: "Please check your inbox" });
};

export const grantAccessToken: RequestHandler = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) sendErrorRes(res, "Unauthorized request", 403);
  const payload = jwt.verify(refreshToken, JWT_SECRET) as { id: string };
  if (!payload.id) sendErrorRes(res, "Unauthorized request", 401);
  const user = await UserModel.findOne({
    _id: payload.id,
    tokens: refreshToken,
  });
  if (!user) {
    await UserModel.findByIdAndUpdate(payload.id, { tokens: [] });
    return sendErrorRes(res, "Unauthorized request", 401);
  }
  const newAccessToken = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "15m",
  });
  const newRefreshToken = jwt.sign({ id: user._id }, JWT_SECRET);

  user.tokens = user.tokens.filter((t) => t !== refreshToken);
  user.tokens.push(newRefreshToken);
  await user.save();
  res.json({
    tokens: {
      refresh: newRefreshToken,
      access: newAccessToken,
    },
  });
};
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return sendErrorRes(res, "Invalid email!", 403);
  const isMacthed = await user.comparePassword(password);
  if (!isMacthed) return sendErrorRes(res, "InvalidPassword", 422);

  const payload = { id: user._id };
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, JWT_SECRET);
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

export const signOut: RequestHandler = async (req, res) => {
  const { refreshToken } = req.body;
  const user = await UserModel.findOne({
    _id: req.user.id,
    tokens: refreshToken,
  });
  if (!user)
    return sendErrorRes(res, "Unauthorized request, user not found!", 403);

  const newTokens = user.tokens.filter((t) => t !== refreshToken);
  user.tokens = newTokens;
  await user.save();
  res.send();
};

export const generateForgetPassLink: RequestHandler = async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return sendErrorRes(res, "Unauthorized User", 404);
  await PassResetTokenModel.findOneAndDelete({ owner: user._id });
  const token = crypto.randomBytes(36).toString("hex");
  await PassResetTokenModel.create({ owner: user._id, token });
  const passResetLink = `${PASSWORD_RESET_LINK}?id=${user._id}&token=${token}`;
  await mail.sendPassResetLink(user.email, passResetLink);
  res.json({ message: "Please check your email!" });
};

export const grantValid: RequestHandler = async (req, res) => {
  res.json({ valid: true });
};

export const updatePassword: RequestHandler = async (req, res) => {
  const { id, password } = req.body;
  const user = await UserModel.findById(id);
  if (!user) return sendErrorRes(res, "Unauthorized request", 403);
  const matched = await user.comparePassword(password);
  if (matched)
    return sendErrorRes(res, "The new password must be different!", 422);
  user.password = password;
  await user.save();
  await PassResetTokenModel.findOneAndDelete({ owner: user._id });
  await mail.sendPasswordUpdateMessage(user.email);
  res.json({ message: "Password reset successfully!" });
};

export const updateProfile: RequestHandler = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== "string" || name.trim().length < 3)
    return sendErrorRes(res, "Invalid name", 422);
  await UserModel.findByIdAndUpdate(req.user.id, { name });
  res.json({ profile: { ...req.user, name } });
};
