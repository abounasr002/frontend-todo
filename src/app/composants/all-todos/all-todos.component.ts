import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../../services/todos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-todos',
  imports: [CommonModule],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.css'
})
export class AllTodosComponent {
  todos$: Observable<any[]>; // Flux des tâches

  constructor(private todoService: TodoService, private router: Router) {
    this.todos$ = this.todoService.getTodos();
  }

  toggleTodo(todo: any): void {
    const updatedTodo = { ...todo, completed: !todo.completed };

    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      todo.completed = !todo.completed; // Mise à jour immédiate dans l'UI
    });
  }

  goToCreateTodo(): void {
    this.router.navigate(['todo/create']); // Redirige vers la page de création
  }

}
