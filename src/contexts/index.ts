import { Router } from "express";
import authController from "./auth/auth.controller";
import todosController from "./todos/todos.controller";

const controllers = Router();

controllers.use("/todos", todosController);
controllers.use("/auth", authController);

export default controllers;
