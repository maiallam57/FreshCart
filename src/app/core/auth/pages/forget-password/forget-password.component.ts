import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth, ErrorRes } from '../../../interfaces/auth';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';

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
  step: number = 1;
  setforgetPasswordFormSub!: Subscription;
  verifyCodeFormSub!: Subscription;
  resetPasswordFormSub!: Subscription;;

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  forgetPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifyCodeForm = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]),
  });

  resetPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  submitforgetPassword(): void {
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

  submitVerifyCodeForm(): void {
    this.response = {};
    this.errorRes = {};

    if (this.verifyCodeForm.valid) {
      this.isLoading = true;
      this.verifyCodeFormApi();
      this.verifyCodeForm.reset();
      this.errorRes = {};
    } else {
      this.isLoading = false;
    }
  }

  submitResetPasswordForm(): void {
    this.response = {};
    this.errorRes = {};

    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      this.resetPasswordFormApi();
      this.resetPasswordForm.reset();
      this.errorRes = {};
    } else {
      this.isLoading = false;
    }
  }

  forgetPasswordFormApi(): void {
    this.setforgetPasswordFormSub = this._authService.setforgetPasswordForm(this.forgetPasswordForm.value).subscribe({
      next: (res) => {
        this.response = res;
        this.isLoading = false;
        if (res.statusMsg == "success") {
          this.step = 2;
        }
      },
      error: (err) => {
        this.errorRes = err;
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  verifyCodeFormApi(): void {
    let emailValue = this.forgetPasswordForm.get('email')?.value;
    this.resetPasswordForm.get('email')?.patchValue(emailValue!);

    this.verifyCodeFormSub = this._authService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        this.response = res;
        this.isLoading = false;
        if (res.status == "Success") {
          this.step = 3;
        }
      },
      error: (err) => {
        this.errorRes = err;
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  resetPasswordFormApi(): void {

    this.resetPasswordFormSub = this._authService.verifyResetCode(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        this.response = res;
        this.isLoading = false;
        localStorage.setItem(environment.token, res.token);
        this._authService.saveUserData();
        this._router.navigate(['/home']);
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
    this.verifyCodeFormSub?.unsubscribe();
    this.resetPasswordFormSub?.unsubscribe();
  }

}