import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthService, Role } from '@core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
  ],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  authForm!: FormGroup;
  submitted = false;
  loading = false;
  rememberMe = false;
  error = '';
  hide = true;

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['clinivaAdmin', Validators.required],
      password: ['admin@123', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get('username')?.setValue('clinivaAdmin');
    this.authForm.get('password')?.setValue('admin@123');
  }
  doctorSet() {
    this.authForm.get('username')?.setValue('doctor');
    this.authForm.get('password')?.setValue('doctor@123');
  }
  patientSet() {
    this.authForm.get('username')?.setValue('patient');
    this.authForm.get('password')?.setValue('patient@123');
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.authService
        .login(this.f['username'].value, this.f['password'].value, false)
        .subscribe({
          next: (response) => {
            const role = response.user.roles[0];
            this.loading = false;
            if (role.name === Role.Admin) {
              this.router.navigate(['/admin/dashboard/main']);
            } else if (role.name === Role.Doctor) {
              this.router.navigate(['/doctor/dashboard']);
            } else if (role.name === Role.Patient) {
              this.router.navigate(['/patient/dashboard']);
            } else {
              this.router.navigate(['/authentication/signin']);
            }
            this.loading = false;
          },
          error: (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          },
        });
    }
  }

  signInWithGoogle(): void {
    // Add OAuth logic here
  }

  signInWithFacebook(): void {
    // Add OAuth logic here
  }

  signInWithApple(): void {
    // Add OAuth logic here
  }
}
