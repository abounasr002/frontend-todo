import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  authService: AuthServiceService;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, authService: AuthServiceService) {
    // ✅ Initialisation dans le constructeur
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.authService = authService;
  }

  onSubmit() {
    if (this.loginForm.valid) {

      this.authService.login(this.loginForm).subscribe({
        next: () => this.router.navigate(['todos']),
        error: (err: any) => this.errorMessage = err.error.message || 'Erreur de connexion'
      });
    }
  }

  goToRegister() {
    console.log("register")
    this.router.navigate(['register'])
  }


}
