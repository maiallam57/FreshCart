import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth, ErrorRes } from '../../../interfaces/auth';
import { environment } from '../../../environment/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  isLoading: boolean = false;
  response!: Auth;
  errorRes!: ErrorRes;
  setLoginFormSub!: Subscription;

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);


  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  })

  submitLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.LoginFormApi();
      this.loginForm.reset();
      this.response = {};
      this.errorRes = {};
    } else {
      this.isLoading = false;
    }
  }

  LoginFormApi(): void {
    this.setLoginFormSub = this._authService.setLoginForm(this.loginForm.value).subscribe({
      next: (res) => {
        this.response = res;
        this.isLoading = false;
        if (res.message == 'success') {
          //save token
          localStorage.setItem(environment.token, res.token);
          //decode the token
          this._authService.saveUserData();
          //navigate
          setTimeout(() => {
            this._router.navigate(['/home']);
          }, 1000);
        }
      },
      error: (err) => {
        this.errorRes = err;
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.setLoginFormSub?.unsubscribe();
  }
}
