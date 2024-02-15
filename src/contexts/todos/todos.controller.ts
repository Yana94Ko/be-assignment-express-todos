import { Router } from "express";
import todosService from "./todos.service";

const todosController = Router();

todosController.get("/", todosService.getTodos);
todosController.get("/:todoId", todosService.getTodo);
todosController.post("/", todosService.createTodo);
todosController.put("/:todoId", todosService.updateTodo);

export default todosController;
