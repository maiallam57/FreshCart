import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Auth, ErrorRes } from '../../../interfaces/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router)

  isLoading: boolean = false;
  response!: Auth;
  errorRes!: ErrorRes;
  setRegisterFormSub!: Subscription;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[@!#$%&? "]).*$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)])
  },
    this.confirmPassword)


  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true }
    }

  }

  getError(name: string, type: string) {
    if (this.registerForm.get(name)?.errors && this.registerForm.get(name)?.touched) {
      return this.registerForm.get(name)?.getError(type);
    }
  }

  getMismatch() {
    return this.registerForm.getError('mismatch') && this.registerForm.get("rePassword")?.touched;
  }

  submitRegister() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      console.log(this.registerForm)
      this.RegisterFormApi();
      this.registerForm.reset();
      this.response = {};
      this.errorRes = {};
    } else {
      this.isLoading = false;
    }
  }


  RegisterFormApi(): void {
    this.setRegisterFormSub = this._authService.setRegisterForm(this.registerForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.response = res;
        if (res.message == 'success') {
          setInterval(() => {
            this._router.navigate(['/login']);
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
    this.setRegisterFormSub?.unsubscribe();
  }

}
