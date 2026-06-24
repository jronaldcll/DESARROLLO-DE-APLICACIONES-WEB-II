import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService, Role } from '@core';
import { User } from '@core/models/interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocalStorageService } from '@shared/services';
import { MatCardModule } from '@angular/material/card';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-locked',
  templateUrl: './locked.component.html',
  styleUrls: ['./locked.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
})
export class LockedComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private store = inject(LocalStorageService);

  authForm!: FormGroup;
  submitted = false;
  userImg!: string;
  userFullName!: string;
  hide = true;
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
    this.userImg = this.authService.currentUser().avatar || '';
    this.userFullName = this.authService.currentUser().name || '';
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      const role = this.store.get<User>('currentUser')?.roles?.[0]?.name;
      if (role === Role.Admin) {
        this.router.navigate(['/admin/dashboard/main']);
      } else if (role === Role.Doctor) {
        this.router.navigate(['/doctor/dashboard']);
      } else if (role === Role.Patient) {
        this.router.navigate(['/patient/dashboard']);
      } else {
        this.router.navigate(['/authentication/signin']);
      }
    }
  }
}
