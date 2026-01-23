import request from 'supertest';
import app from '../app';
import * as todoService from '../services/todoService';
import { Todo } from '../@types/Todo';

jest.mock('../services/todoService');

const mockedService = todoService as jest.Mocked<typeof todoService>;

describe('TodoController', () => {
  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    isCompleted: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /todos', () => {
    it('should return all todos', async () => {
      mockedService.getAll.mockReturnValue([mockTodo]);

      const response = await request(app).get('/todos');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockTodo]);
      expect(mockedService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const payload = { title: 'New Todo', description: 'New Desc' };
      mockedService.create.mockReturnValue({ ...mockTodo, ...payload });

      const response = await request(app)
        .post('/todos')
        .send(payload);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(payload.title);
      expect(mockedService.create).toHaveBeenCalledWith(payload);
    });
  });

  describe('PUT /todos/:id', () => {
    it('should update a todo status', async () => {
      mockedService.update.mockReturnValue({ ...mockTodo, isCompleted: true });

      const response = await request(app)
        .put('/todos/1')
        .send({ isCompleted: true });

      expect(response.status).toBe(200);
      expect(response.body.isCompleted).toBe(true);
      expect(mockedService.update).toHaveBeenCalledWith(1, true);
    });

    it('should return 404 if todo not found', async () => {
      mockedService.update.mockReturnValue(null);

      const response = await request(app)
        .put('/todos/999')
        .send({ isCompleted: true });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Todo not found');
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should remove a todo', async () => {
      mockedService.remove.mockReturnValue(mockTodo);

      const response = await request(app).delete('/todos/1');

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(mockedService.remove).toHaveBeenCalledWith(1);
    });

    it('should return 404 if todo not found', async () => {
      mockedService.remove.mockReturnValue(null);

      const response = await request(app).delete('/todos/999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Todo not found');
    });
  });
});
