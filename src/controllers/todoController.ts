//recebe a requisição e delega a lógica
// Controller não acessa o repositório diretamente, ele chama o service
import * as service from '../services/todoService';
import { Request, Response } from '../@types/Http';
import { CreateTodoPayload, Todo, UpdateTodoPayload } from '../@types/Todo';

// @TODO: add error handling to each controller request

export function getAll(_req: Request, res: Response<Todo[]>) {
  res.json(service.getAll());
}

export function create(
  req: Request<unknown, CreateTodoPayload>,
  res: Response<Todo>,
) {
  const body = req.body;

  const todo = service.create(body);
  res.status(201).json(todo);
}

// @TODO: make possible to edit another fields other than isCompleted
export function update(
  req: Request<{ id: number }, UpdateTodoPayload>,
  res: Response<Todo>,
) {
  const id = Number(req.params.id);
  const { isCompleted } = req.body;

  const updatedTodo = service.update(id, isCompleted);

  if (!updatedTodo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json(updatedTodo);
}

export function remove(req: Request<{ id: number }>, res: Response<Todo>) {
  const id = Number(req.params.id);
  const removedTodo = service.remove(id);

  if (!removedTodo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json(removedTodo);
}
