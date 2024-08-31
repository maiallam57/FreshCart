import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth, ErrorRes } from '../../../interfaces/auth';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnDestroy {
  isLoading: boolean = false;
  response!: Auth;
  errorRes!: ErrorRes;
  setforgetPasswordFormSub!: Subscription;

  private readonly _authService = inject(AuthService);

  forgetPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  submitforgetPassword() {
    this.response = {};
    this.errorRes = {};

    if (this.forgetPasswordForm.valid) {
      this.isLoading = true;
      this.forgetPasswordFormApi();
      this.forgetPasswordForm.reset();
      this.errorRes = {};
    } else {
      this.isLoading = false;
    }
  }

  forgetPasswordFormApi(): void {
    this._authService.setforgetPasswordForm(this.forgetPasswordForm.value).subscribe({
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
  }

  ngOnDestroy(): void {
    this.setforgetPasswordFormSub?.unsubscribe();
  }

}