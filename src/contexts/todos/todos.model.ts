import fs from "fs/promises";
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
}
