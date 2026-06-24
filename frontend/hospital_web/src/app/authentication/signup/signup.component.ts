import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
})
export class SignupComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  signupForm!: FormGroup;
  hidePassword = true;
  isLoading = false;
  ngOnInit(): void {
    this.initializeForm();
  }
  private initializeForm(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        // Handle successful submission
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.signupForm.controls).forEach((key) => {
      const control = this.signupForm.get(key);
      control?.markAsTouched();
    });
  }

  signInWithGoogle(): void {
    // Implement Google OAuth logic
  }

  signInWithApple(): void {
    // Implement Apple OAuth logic
  }

  signInWithFacebook(): void {
    // Implement Facebook OAuth logic
  }
}
