import { CommonModule } from '@angular/common';
import { Component, input , ChangeDetectionStrategy} from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-income-info-box',
    imports: [MatCardModule, CommonModule],
    templateUrl: './income-info-box.component.html',
    styleUrl: './income-info-box.component.scss'
})
export class IncomeInfoBoxComponent {
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly value = input<string | number>('');
  readonly valueClass = input<string>(''); // e.g., 'text-info' or 'text-danger'
  readonly progress = input<number>(0); // Progress percentage
  readonly progressClass = input<string>(''); // e.g., 'l-bg-purple'
  readonly change = input<string>(''); // Change percentage or value
}
