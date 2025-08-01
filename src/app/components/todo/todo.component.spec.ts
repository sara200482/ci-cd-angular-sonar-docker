import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { TodoService } from '../../services/todo.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    mockTodoService = jasmine.createSpyObj('TodoService', [
      'addTodo',
      'markAsDone',
      'deleteTodo'
    ]);

    mockTodoService.todos$ = of([
      { id: 1, title: 'Tâche 1', completed: false },
      { id: 2, title: 'Tâche 2', completed: false }
    ]);

    await TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [FormsModule],
      providers: [{ provide: TodoService, useValue: mockTodoService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait charger les tâches depuis le service', () => {
    expect(component.todos.length).toBe(2);
  });

  it('devrait ajouter une tâche', () => {
    component.newTodoTitle = 'Nouvelle tâche';
    component.addTodo();
    expect(mockTodoService.addTodo).toHaveBeenCalledWith('Nouvelle tâche');
  });

  it('devrait marquer une tâche comme terminée', () => {
    component.markAsDone(1);
    expect(mockTodoService.markAsDone).toHaveBeenCalledWith(1);
  });

  it('devrait supprimer une tâche', () => {
    component.deleteTodo(1);
    expect(mockTodoService.deleteTodo).toHaveBeenCalledWith(1);
  });
});
