import * as todoService from '../services/todoService';
import * as todoRepository from '../repositories/todoRepository';
import { Todo } from '../@types/Todo';

jest.mock('../repositories/todoRepository');

const mockedRepository = todoRepository as jest.Mocked<typeof todoRepository>;

describe('TodoService', () => {
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

  it('should get all todos', () => {
    mockedRepository.findAll.mockReturnValue([mockTodo]);
    
    const result = todoService.getAll();
    
    expect(result).toEqual([mockTodo]);
    expect(mockedRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should create a todo', () => {
    const payload = { title: 'New Todo', description: 'New Desc' };
    mockedRepository.create.mockReturnValue({ ...mockTodo, ...payload });

    const result = todoService.create(payload);

    expect(result.title).toBe(payload.title);
    expect(mockedRepository.create).toHaveBeenCalledWith(payload);
  });

  it('should update a todo', () => {
    mockedRepository.update.mockReturnValue({ ...mockTodo, isCompleted: true });

    const result = todoService.update(1, true);

    expect(result?.isCompleted).toBe(true);
    expect(mockedRepository.update).toHaveBeenCalledWith(1, true);
  });

  it('should return null if update fails', () => {
    mockedRepository.update.mockReturnValue(null);

    const result = todoService.update(999, true);

    expect(result).toBeNull();
    expect(mockedRepository.update).toHaveBeenCalledWith(999, true);
  });

  it('should remove a todo', () => {
    mockedRepository.remove.mockReturnValue(mockTodo);

    const result = todoService.remove(1);

    expect(result?.id).toBe(1);
    expect(mockedRepository.remove).toHaveBeenCalledWith(1);
  });

  it('should return null if remove fails', () => {
    mockedRepository.remove.mockReturnValue(null);

    const result = todoService.remove(999);

    expect(result).toBeNull();
    expect(mockedRepository.remove).toHaveBeenCalledWith(999);
  });
});
