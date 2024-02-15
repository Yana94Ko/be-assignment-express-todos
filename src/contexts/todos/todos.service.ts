import { RequestHandler } from "express";
import { CreateTodoDto, UpdateTodoDto } from "./todos.dto";
import TodosModel from "./todos.model";
import { Todo } from "./todos.type";

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
const deleteTodo: RequestHandler = async (req, res) => {
  const todoId = Number(req.params.todoId);
  const todo: Todo = req.body;
  if (todo.id !== todoId) return res.sendStatus(400);
  const deletedTodo = await TodosModel.delete(todoId, todo);
  res.json(deletedTodo);
};

const todosService = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default todosService;
