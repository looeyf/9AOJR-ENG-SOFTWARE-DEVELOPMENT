import * as repository from '../repositories/todoRepository';
import { Todo } from '../@types/Todo';

export function getAll(): Todo[] {
  return repository.findAll();
}

// @TODO: create shared type for Omit<Todo, 'id' | 'isCompleted' | 'createdAt' | 'completedAt'>
export function create({
  title,
  description,
}: Omit<Todo, 'id' | 'isCompleted' | 'createdAt' | 'completedAt'>): Todo {
  return repository.create({
    title,
    description,
    isCompleted: false,
  });
}

export function update(id: number, completed: boolean): Todo | null {
  return repository.update(id, completed);
}

export function remove(id: number): Todo | null {
  return repository.remove(id);
}
