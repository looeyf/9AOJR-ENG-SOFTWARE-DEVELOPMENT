import { Todo } from '../@types/Todo';

const todos: Todo[] = [];
let currentId = 1;

export function findAll(): Todo[] {
  return todos;
}

export function create(
  todo: Omit<Todo, 'id' | 'createdAt' | 'completedAt'>,
): Todo {
  const createdAt = new Date().toISOString();

  const newTodo: Todo = {
    id: currentId++,
    title: todo.title,
    description: todo.description,
    isCompleted: todo.isCompleted,
    createdAt,
    completedAt: null,
  };

  todos.push(newTodo);
  return newTodo;
}

export function update(id: number, isCompleted: boolean): Todo | null {
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) return null;

  todo.isCompleted = isCompleted;
  todo.completedAt = isCompleted ? new Date().toISOString() : null;

  return todo;
}

export function remove(id: number): Todo | null {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return null;

  const removedTodo = todos.splice(index, 1);
  return removedTodo[0];
}
