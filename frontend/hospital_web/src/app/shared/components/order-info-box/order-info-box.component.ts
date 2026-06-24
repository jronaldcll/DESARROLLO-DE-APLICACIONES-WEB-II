import { CommonModule } from '@angular/common';
import { Component, input , ChangeDetectionStrategy} from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-order-info-box',
    imports: [MatCardModule, CommonModule],
    templateUrl: './order-info-box.component.html',
    styleUrl: './order-info-box.component.scss'
})
export class OrderInfoBoxComponent {
  readonly title = input<string>('');
  readonly value = input<string | number>('');
  readonly percentageText = input<string>('');
  readonly iconClass = input<string>('');
  readonly bgClass = input<string>('');
}
