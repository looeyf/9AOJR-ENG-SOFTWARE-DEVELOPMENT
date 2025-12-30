import { Nullable } from './Common';

export interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  completedAt: string | null;
}

export type CreateTodoPayload = Pick<Todo, 'title' | 'description'>;

export type UpdateTodoPayload = Pick<Todo, 'isCompleted'>;

export type NullableTodo = Nullable<Todo>;
