import fs from "fs/promises";
import { CreateTodoDto, UpdateTodoDto } from "./todos.dto";
import { Todo } from "./todos.type";

export default class TodosModel {
  static async findMany() {
    const todos = await fs
      .readFile("./src/data/todos.json", {
        encoding: "utf-8",
      })
      .then((data) => JSON.parse(data) as Todo[]);

    return todos;
  }
  static async findOne(todoId: number) {
    const todos = await fs
      .readFile("./src/data/todos.json", {
        encoding: "utf-8",
      })
      .then((data) => JSON.parse(data) as Todo[]);

    const todo = todos.filter((todo) => todo.id === todoId);

    return todo;
  }
  static async save(dto: CreateTodoDto) {
    const todos = await fs
      .readFile("./src/data/todos.json", { encoding: "utf-8" })
      .then((data) => JSON.parse(data));
    const newTodo = { id: todos.length + 1, ...dto };
    todos.push(newTodo);

    const stringifiedTodos = JSON.stringify(todos);

    await fs.writeFile("./src/data/todos.json", stringifiedTodos);

    return newTodo;
  }
  static async update(dto: UpdateTodoDto) {
    const todos = await fs
      .readFile("./src/data/todos.json", {
        encoding: "utf-8",
      })
      .then((data) => JSON.parse(data) as Todo[]);

    todos.forEach((todo) => {
      if (todo.id === dto.id) {
        dto.title ? (todo.title = dto.title) : todo.title;
        dto.completed ? (todo.completed = dto.completed) : todo.completed;
      }
    });

    const stringifiedTodos = JSON.stringify(todos);
    fs.writeFile("./src/data/todos.json", stringifiedTodos);

    const updatedIdx = dto.id - 1;

    return todos[updatedIdx];
  }
}
