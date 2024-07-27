import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordService } from '../services/forgot-password.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const token = this.route.snapshot.queryParamMap.get('token');
      const password = this.resetPasswordForm.get('password')?.value;
      const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;

      if (password === confirmPassword) {
        // this.forgotPasswordService.resetPassword(token, password).subscribe(
        //   response => {
        //     this.successMessage = 'Password has been reset successfully.';
        //     this.errorMessage = null;
        //     this.router.navigate(['/login']);
        //   },
        //   error => {
        //     this.errorMessage = 'Failed to reset password. Please try again later.';
        //     this.successMessage = null;
        //   }
        // );
      } else {
        this.errorMessage = 'Passwords do not match.';
      }
    }
  }
}
