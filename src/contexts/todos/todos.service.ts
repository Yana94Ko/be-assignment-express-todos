import { RequestHandler } from "express";
import TodosModel from "./todos.model";

const getTodos: RequestHandler = async (_, res) => {
  const todos = await TodosModel.findMany();
  res.json(todos);
};

const todosService = {
  getTodos,
};

export default todosService;
