import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  it('devrait ajouter une tâche', () => {
    service.addTodo('Nouvelle tâche');
    service.todos$.subscribe(todos => {
      expect(todos.length).toBe(3);
      expect(todos.some(todo => todo.title === 'Nouvelle tâche')).toBeTrue();
    });
  });

  it('devrait marquer une tâche comme terminée', () => {
    service.markAsDone(1);
    service.todos$.subscribe(todos => {
      const todo = todos.find(t => t.id === 1);
      expect(todo?.completed).toBeTrue();
    });
  });

  it('devrait supprimer une tâche', () => {
    service.deleteTodo(1);
    service.todos$.subscribe(todos => {
      expect(todos.some(todo => todo.id === 1)).toBeFalse();
    });
  });
});
