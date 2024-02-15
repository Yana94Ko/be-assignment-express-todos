import { RequestHandler } from "express";
import { CreateTodoDto, UpdateTodoDto } from "./todos.dto";
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
const createTodo: RequestHandler = async (req, res) => {
  const dto: CreateTodoDto = req.body;
  const newTodos = await TodosModel.save(dto);
  res.json(newTodos);
};
const updateTodo: RequestHandler = async (req, res) => {
  const todoId = Number(req.params.todoId);
  const dto: UpdateTodoDto = req.body;
  if (dto.id !== todoId) return res.sendStatus(400);
  const newTodos = await TodosModel.update(dto);
  res.json(newTodos);
};

const todosService = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
};

export default todosService;
