import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ward-bed-status',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatIconModule],
  templateUrl: './ward-bed-status.component.html',
  styleUrl: './ward-bed-status.component.scss'
})
export class WardBedStatusComponent {
  wards = [
    { name: 'ICU', total: 20, occupied: 18, color: 'warn' },
    { name: 'General Ward', total: 100, occupied: 75, color: 'primary' },
    { name: 'Pediatric', total: 30, occupied: 12, color: 'accent' },
    { name: 'Maternity', total: 40, occupied: 38, color: 'warn' }
  ];

  calculateProgress(occupied: number, total: number): number {
    return (occupied / total) * 100;
  }
}
