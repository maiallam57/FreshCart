import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
  private readonly _router = inject(Router);


  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  })

  submitLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._authService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          this.response = res;
          this.isLoading = false;
          if (res.message == 'success') {
            setInterval(() => {
              this._router.navigate(['/home']);
            }, 1000);
          }
        },
        error: (err) => {
          this.errorRes = err;
          this.isLoading = false;
        }
      });
      this.loginForm.reset();
      this.response = {};
      this.errorRes = {};
    } else {
      this.isLoading = false;
    }

  }

}
