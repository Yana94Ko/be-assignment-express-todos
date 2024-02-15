import { Router } from "express";
import todosService from "./todos.service";

const todosController = Router();

todosController.get("/", todosService.getTodos);

export default todosController;
