export type CreateTodoDto = {
  userId: number;
  title: string;
  completed: boolean;
};
export type UpdateTodoDto = {
  id: number;
  userId: number;
  title?: string;
  completed?: boolean;
};
