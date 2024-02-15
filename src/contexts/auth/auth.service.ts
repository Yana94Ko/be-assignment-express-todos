import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import {
  LogInHttpRequest,
  SignUpHttpRequest,
  SignUpUserDto,
  UpdateUserDto,
  UserHttpRequest,
} from "./auth.dto";
import UsersModel from "./auth.model";
import { User } from "./auth.type";

const signUp: RequestHandler = async (req, res) => {
  const request: SignUpHttpRequest = req.body;
  const { password, ...rest } = request;

  const encryptedPassword = await bcrypt.hash(request.password, 12);

  const dto: SignUpUserDto = {
    encryptedPassword: encryptedPassword,
    ...rest,
  };

  const existUser = await UsersModel.findOneByEmail(dto.email);
  if (existUser) return res.status(409).send("Email duplicated");

  const newUser: User = await UsersModel.save(dto);

  const accessToken = jwt.sign(
    {
      email: newUser.email,
      userId: newUser.userId,
      nickName: newUser.nickname,
    },
    JWT_SECRET_KEY,
    { subject: newUser.userId.toString() }
  );

  res.cookie("accessToken", accessToken, {
    maxAge: 1800000, // 30분
  });
  res.json(newUser);
};

const logIn: RequestHandler = async (req, res) => {
  const { email, password }: LogInHttpRequest = req.body;

  const user = await UsersModel.findOneByEmail(email);
  if (!user) return res.status(404).send(`User Not Found by email : ${email}`);

  const isVerified = await bcrypt.compare(password, user.encryptedPassword);

  if (!isVerified) return res.send(400);

  const accessToken = jwt.sign(
    {
      email: user.email,
      userId: user.userId,
      nickName: user.nickname,
    },
    JWT_SECRET_KEY,
    { subject: user.userId.toString() }
  );
  res.cookie("accessToken", accessToken, {
    maxAge: 1800000, // 30분
  });
  res.json(user);
};

const getUsers: RequestHandler = async (_, res) => {
  const users = await UsersModel.findMany();
  res.json(users);
};

const getUser: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);
  const user = await UsersModel.findOne(userId);
  res.json(user);
};

const updateUser: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);
  const request: UserHttpRequest = req.body;
  if (request.userId !== userId) return res.sendStatus(400);

  const user = await UsersModel.findOneByEmail(request.email);
  if (!user)
    return res.status(404).send(`User Not Found by email : ${request.email}`);

  const isVerified = await bcrypt.compare(
    request.password,
    user.encryptedPassword
  );

  if (!isVerified) return res.send(400);
  const encryptedNewPassword = request.newPassword
    ? await bcrypt.hash(request.newPassword, 12)
    : undefined;

  const dto: UpdateUserDto = {
    userId: request.userId,
    email: request.email,
    encryptedNewPassword: encryptedNewPassword,
    nickname: request.nickname,
  };

  const newUsers = await UsersModel.update(dto);
  res.json(newUsers);
};

const deleteUser: RequestHandler = async (req, res) => {
  const userId = Number(req.params.userId);
  const user: UserHttpRequest = req.body;
  if (user.userId !== userId) return res.sendStatus(400);

  const existUser = await UsersModel.findOneByEmail(user.email);
  if (!existUser)
    return res.status(404).send(`User Not Found by email : ${user.email}`);

  const isVerified = await bcrypt.compare(
    user.password,
    existUser.encryptedPassword
  );

  if (!isVerified) return res.send(400);

  const deletedUser = await UsersModel.delete(userId, user.email);
  res.json(deletedUser);
};

const usersService = {
  getUsers,
  getUser,
  signUp,
  logIn,
  updateUser,
  deleteUser,
};

export default usersService;
