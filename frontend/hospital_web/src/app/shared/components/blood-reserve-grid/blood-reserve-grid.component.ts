import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-blood-reserve-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './blood-reserve-grid.component.html',
  styleUrl: './blood-reserve-grid.component.scss'
})
export class BloodReserveGridComponent {
  reserves = [
    { group: 'A+', units: 45, status: 'Stable' },
    { group: 'B+', units: 32, status: 'Stable' },
    { group: 'O-', units: 8, status: 'Critical' },
    { group: 'AB+', units: 15, status: 'Low' }
  ];
}
