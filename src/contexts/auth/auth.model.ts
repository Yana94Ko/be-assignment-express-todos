import { response } from "express";
import fs from "fs/promises";
import { SignUpUserDto, UpdateUserDto } from "./auth.dto";
import { User } from "./auth.type";

export default class UsersModel {
  static async findMany() {
    const users = await fs
      .readFile("./src/data/users.json", {
        encoding: "utf-8",
      })
      .then((data) => JSON.parse(data) as User[]);

    return users;
  }
  static async findOne(userId: number) {
    const users = await fs
      .readFile("./src/data/users.json", {
        encoding: "utf-8",
      })
      .then((data) => JSON.parse(data) as User[]);

    const user = users.filter((user) => user.userId === userId);

    return user;
  }
  static async findOneByEmail(email: string) {
    const users = await fs
      .readFile("./src/data/users.json", {
        encoding: "utf-8",
      })
      .then((data) => JSON.parse(data) as User[]);

    const user = users.find((user) => user.email === email);

    return user;
  }
  static async save(dto: SignUpUserDto) {
    const users = await fs
      .readFile("./src/data/users.json", { encoding: "utf-8" })
      .then((data) => JSON.parse(data));
    const newUser = { userId: users.length + 1, ...dto };
    users.push(newUser);

    const stringifiedUsers = JSON.stringify(users);

    await fs.writeFile("./src/data/users.json", stringifiedUsers);

    return newUser;
  }
  static async update(dto: UpdateUserDto) {
    const users = await fs
      .readFile("./src/data/users.json", {
        encoding: "utf-8",
      })
      .then((data) => JSON.parse(data) as User[]);

    users.forEach((user) => {
      if (user.userId === dto.userId) {
        dto.nickname && (user.nickname = dto.nickname);
        dto.encryptedNewPassword &&
          (user.encryptedPassword = dto.encryptedNewPassword);
      }
    });

    const stringifiedUsers = JSON.stringify(users);
    fs.writeFile("./src/data/users.json", stringifiedUsers);

    const updatedIdx = dto.userId - 1;

    return users[updatedIdx];
  }
  static async delete(userId: number, user: User) {
    const users = await fs
      .readFile("./src/data/users.json", {
        encoding: "utf-8",
      })
      .then((data) => JSON.parse(data) as User[]);

    const userData = users.find((user) => user.userId === userId);
    if (!userData) return response.status(404);
    if (JSON.stringify(userData) !== JSON.stringify(user))
      return response.status(400);

    const deletedUsers = users.filter((user) => user.userId !== userId);

    const stringifiedDeletedUsers = JSON.stringify(deletedUsers);
    fs.writeFile("./src/data/users.json", stringifiedDeletedUsers);

    return `delete success ${JSON.stringify(user)}`;
  }
}
