import { Request, Response } from 'express';
import * as service from '../services/todoService';
import { Todo } from '../@types/Todo';
import { Error } from '../@types/Error';

// @TODO: add error handling to each controller request

export function getAll(_req: Request, res: Response<Todo[]>) {
  res.json(service.getAll());
}

// @TODO: create shared type for Omit<Todo, 'id' | 'isCompleted' | 'createdAt' | 'completedAt'>
export function create(
  req: Request<
    unknown,
    unknown,
    Omit<Todo, 'id' | 'isCompleted' | 'createdAt' | 'completedAt'>
  >,
  res: Response<Todo>,
) {
  const body = req.body;

  const todo = service.create(body);
  res.status(201).json(todo);
}

// @TODO: check if it's needed to create shared types for id and isCompleted since it's
// being used across the application
export function update(
  req: Request<{ id: number }, unknown, { isCompleted: boolean }>,
  res: Response<Todo | Error | null>,
) {
  const id = Number(req.params.id);
  const { isCompleted } = req.body;

  const updated = service.update(id, isCompleted);

  if (!updated) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json(updated);
}

export function remove(
  req: Request<{ id: number }>,
  res: Response<Todo | Error | null>,
) {
  const id = Number(req.params.id);
  const removedTodo = service.remove(id);

  if (!removedTodo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json(removedTodo);
}
