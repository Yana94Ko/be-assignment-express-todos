import { RequestHandler } from "express";
import TodosModel from "./todos.model";

const getTodos: RequestHandler = async (_, res) => {
  const todos = await TodosModel.findMany();
  res.json(todos);
};
const getTodo: RequestHandler = async (req, res) => {
  const todoId = Number(req.params.todoId);
  const todo = await TodosModel.findOne(todoId);
  res.json(todo);
};

const todosService = {
  getTodos,
  getTodo,
};

export default todosService;
