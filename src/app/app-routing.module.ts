import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' }, // Redirection vers `/todos`
  { path: 'todos', component: TodoComponent }, // Route principale vers le composant Todo
  { path: '**', redirectTo: '/todos' } // Redirection si la route est inconnue
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
