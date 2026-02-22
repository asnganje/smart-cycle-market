import { RequestHandler } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import PassResetTokenModel from "src/models/PasswordResetToken";
import UserModel from "src/models/User";
import { sendErrorRes } from "src/utils/helper";

const JWT_SECRET=process.env.JWT_SECRET!
interface UserProfile {
  id: string;
  name: string;
  email: string;
  verified: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user: UserProfile;
    }
  }
}

export const isAuth: RequestHandler = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) return sendErrorRes(res, "Unauthorized request!", 403);
    const token = authToken.split("Bearer ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const user = await UserModel.findById(decoded.id);

    if (!user) return sendErrorRes(res, "Unauthorized request!", 403);

    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      verified: user.verified,
    };
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return sendErrorRes(res, "Session expired!", 401);
    }
    if (error instanceof JsonWebTokenError) {
      return sendErrorRes(res, "Unauthorized access!", 401);
    }
    next(error);
  }
};

export const isValidPassResetToken: RequestHandler = async (req, res, next) => {
  const { id, token } = req.body;
  const resetPassToken = await PassResetTokenModel.findOne({ owner: id });
  if (!resetPassToken)
    return sendErrorRes(res, "Unauthorized request, invalid token", 403);
  const isMatched = resetPassToken.compareToken(token);
  if (!isMatched)
    return sendErrorRes(res, "Unauthorized request, invalid token", 403);
  next();
};
