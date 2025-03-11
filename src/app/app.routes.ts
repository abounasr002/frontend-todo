import { Routes } from '@angular/router';
import { LoginComponent } from './composants/login/login.component';
import { RegisterComponent } from './composants/register/register.component';
import { CreateTodoComponent } from './composants/create-todo/create-todo.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'todo/create', component: CreateTodoComponent }

];
