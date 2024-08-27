import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _authService = inject(AuthService);

  isLoading: boolean = false;

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
      this._authService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      });
      this.registerForm.reset();
    } else {
      this.isLoading = false;
    }
  }
}
