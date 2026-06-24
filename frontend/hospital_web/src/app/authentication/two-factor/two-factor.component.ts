import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-two-factor',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.scss'],
})
export class TwoFactorComponent {
  authForm!: UntypedFormGroup;
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.router.navigate(['/admin/dashboard/main']);
    }
  }

  moveToNext(event: KeyboardEvent, nextInputId: string, prevInputId: string) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && !input.value) {
      if (prevInputId) {
        document.getElementById(prevInputId)?.focus();
      }
    } else if (input.value.length === 1 && nextInputId) {
      document.getElementById(nextInputId)?.focus();
    }
  }
}
