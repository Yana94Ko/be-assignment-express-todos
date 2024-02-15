import { Router } from "express";
import todosController from "./todos/todos.controller";

const controllers = Router();

controllers.use("/todos", todosController);

export default controllers;
