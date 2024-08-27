import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth, ErrorRes } from '../../../interfaces/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading: boolean = false;
  response!: Auth;
  errorRes!: ErrorRes;

  private readonly _authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  })

  submitLogin() {
    this.response = {};
    this.errorRes = {};

    if (this.loginForm.valid) {
      this.isLoading = true;
      this._authService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          this.response = res;
          console.log(res);
          this.isLoading = false;
        },
        error: (err) => {
          this.errorRes = err;
          console.log(err);
          this.isLoading = false;
        }
      });
      this.loginForm.reset();
      this.errorRes = {};
    } else {
      this.isLoading = false;
    }

  }

}
