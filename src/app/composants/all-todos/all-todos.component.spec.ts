import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllTodosComponent } from './all-todos.component';
import { TodoService } from '../../services/todos.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';


describe('AllTodosComponent', () => {
  let component: AllTodosComponent;
  let fixture: ComponentFixture<AllTodosComponent>;
  let mockTodoService: any;
  let mockRouter: any;

  beforeEach(async () => {
    // 🔹 Mock du service TodoService
    mockTodoService = {
      getTodos: jasmine.createSpy('getTodos').and.returnValue(of([
        { id: 1, task: 'Faire les courses', completed: false },
        { id: 2, task: 'Lire un livre', completed: true }
      ])),
      updateTodo: jasmine.createSpy('updateTodo').and.returnValue(of({}))
    };

    // 🔹 Mock du Router
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AllTodosComponent], // ✅ Ajouté ici au lieu de "declarations"
      providers: [
        { provide: TodoService, useValue: mockTodoService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AllTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait récupérer les tâches à l\'initialisation', () => {
    component.todos$.subscribe(todos => {
      expect(todos.length).toBe(2);
      expect(todos[0].task).toBe('Faire les courses');
    });
    expect(mockTodoService.getTodos).toHaveBeenCalled();
  });

  it('devrait basculer l\'état de complétion d\'une tâche', () => {
    const todo = { id: 1, task: 'Faire les courses', completed: false };
    
    component.toggleTodo(todo);

    expect(mockTodoService.updateTodo).toHaveBeenCalledWith({ id: 1, task: 'Faire les courses', completed: true });
    expect(todo.completed).toBe(true);
  });

  it('devrait rediriger vers la page de création de tâche', () => {
    component.goToCreateTodo();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['todo/create']);
  });
});
