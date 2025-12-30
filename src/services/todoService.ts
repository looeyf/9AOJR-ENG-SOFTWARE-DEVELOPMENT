import * as repository from '../repositories/todoRepository';
import { CreateTodoPayload, NullableTodo, Todo } from '../@types/Todo';

export function getAll(): Todo[] {
  return repository.findAll();
}

export function create({ title, description }: CreateTodoPayload): Todo {
  return repository.create({
    title,
    description,
  });
}

export function update(id: number, isCompleted: boolean): NullableTodo {
  return repository.update(id, isCompleted);
}

export function remove(id: number): NullableTodo {
  return repository.remove(id);
}
