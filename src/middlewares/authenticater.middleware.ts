import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UsersModel from "../contexts/auth/auth.model";
import { JWT_SECRET_KEY } from "../contexts/config";

const freePassRoutes = ["/auth/sign-up", "/auth/log-in"];

export default async function authenticator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (freePassRoutes.includes(req.url)) return next();
  const { accessToken } = req.cookies;
  if (!accessToken) return res.sendStatus(401);

  try {
    const { sub: userId } = jwt.verify(accessToken, JWT_SECRET_KEY);
    if (!userId) return res.sendStatus(404);
    const user = await UsersModel.findOne(Number(userId));
    if (!user) return res.sendStatus(404);
    req.user = {
      userId: user.userId,
      email: user.email,
      nickname: user.nickname,
    };
  } catch (e) {
    return res.sendStatus(401);
  }

  next();
}
