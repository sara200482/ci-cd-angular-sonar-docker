import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  constructor() {
    this.todosSubject.next([
      { id: 1, title: 'Acheter du lait', completed: false },
      { id: 2, title: 'Faire du sport', completed: false }
    ]);
  }

  addTodo(title: string): void {
    const currentTodos = this.todosSubject.getValue();
    const newTodo: Todo = { id: Date.now(), title, completed: false };
    this.todosSubject.next([...currentTodos, newTodo]);
  }

  markAsDone(id: number): void {
    const updatedTodos = this.todosSubject.getValue().map(todo =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    this.todosSubject.next(updatedTodos);
  }

  deleteTodo(id: number): void {
    const updatedTodos = this.todosSubject.getValue().filter(todo => todo.id !== id);
    this.todosSubject.next(updatedTodos);
  }
}
