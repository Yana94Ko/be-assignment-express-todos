import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import { SignUpHttpRequest, SignUpUserDto, UpdateUserDto } from "./auth.dto";
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

const getUsers: RequestHandler = async (_, res) => {
  const Users = await UsersModel.findMany();
  res.json(Users);
};

const getUser: RequestHandler = async (req, res) => {
  const UserId = Number(req.params.UserId);
  const User = await UsersModel.findOne(UserId);
  res.json(User);
};

const updateUser: RequestHandler = async (req, res) => {
  const UserId = Number(req.params.UserId);
  const dto: UpdateUserDto = req.body;
  if (dto.userId !== UserId) return res.sendStatus(400);
  const newUsers = await UsersModel.update(dto);
  res.json(newUsers);
};

const deleteUser: RequestHandler = async (req, res) => {
  const UserId = Number(req.params.UserId);
  const User: User = req.body;
  if (User.userId !== UserId) return res.sendStatus(400);
  const deletedUser = await UsersModel.delete(UserId, User);
  res.json(deletedUser);
};

const usersService = {
  getUsers,
  getUser,
  signUp,
  updateUser,
  deleteUser,
};

export default usersService;
