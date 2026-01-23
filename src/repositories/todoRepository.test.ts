import * as todoRepository from './todoRepository';

describe('TodoRepository', () => {
  beforeEach(() => {
    todoRepository.clearTodos();
  });

  it('should create a new todo', () => {
    const payload = { title: 'Test Todo', description: 'Test Description' };
    const todo = todoRepository.create(payload);

    expect(todo).toHaveProperty('id', 1);
    expect(todo.title).toBe(payload.title);
    expect(todo.description).toBe(payload.description);
    expect(todo.isCompleted).toBe(false);
    expect(todo.createdAt).toBeDefined();
    expect(todo.completedAt).toBeNull();
  });

  it('should find all todos', () => {
    todoRepository.create({ title: 'Todo 1', description: 'Desc 1' });
    todoRepository.create({ title: 'Todo 2', description: 'Desc 2' });

    const todos = todoRepository.findAll();
    expect(todos.length).toBe(2);
    expect(todos[0].title).toBe('Todo 1');
    expect(todos[1].title).toBe('Todo 2');
  });

  it('should update a todo status', () => {
    const todo = todoRepository.create({
      title: 'Update Me',
      description: 'Desc',
    });
    const updated = todoRepository.update(todo.id, true);

    expect(updated?.isCompleted).toBe(true);
    expect(updated?.completedAt).toBeDefined();

    const reverted = todoRepository.update(todo.id, false);
    expect(reverted?.isCompleted).toBe(false);
    expect(reverted?.completedAt).toBeNull();
  });

  it('should return null when updating non-existent todo', () => {
    const result = todoRepository.update(999, true);
    expect(result).toBeNull();
  });

  it('should remove a todo', () => {
    const todo = todoRepository.create({
      title: 'Remove Me',
      description: 'Desc',
    });
    const removed = todoRepository.remove(todo.id);

    expect(removed?.id).toBe(todo.id);
    expect(todoRepository.findAll().length).toBe(0);
  });

  it('should return null when removing non-existent todo', () => {
    const result = todoRepository.remove(999);
    expect(result).toBeNull();
  });

  it('should increment IDs correctly', () => {
    const todo1 = todoRepository.create({
      title: 'Todo 1',
      description: 'Desc 1',
    });
    const todo2 = todoRepository.create({
      title: 'Todo 2',
      description: 'Desc 2',
    });

    expect(todo1.id).toBe(1);
    expect(todo2.id).toBe(2);
  });
});
