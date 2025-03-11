import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-todo',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css'
})
export class CreateTodoComponent {
  todoForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private todoService: TodoService, private router: Router) {
    this.todoForm = this.fb.group({
      task: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.todoForm.valid) {
      this.todoService.createTodo(this.todoForm.value).subscribe({
        next: () => this.router.navigate(['/todos']),
        error: (err: any) => this.errorMessage = err.error.message || 'Erreur lors de la création de la tâche'
      });
    }
  }
}
