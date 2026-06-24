import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-health-advisory',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './health-advisory.component.html',
  styleUrl: './health-advisory.component.scss'
})
export class HealthAdvisoryComponent {
  advisory = {
    title: 'Heat Wave Alert',
    tip: 'Ensure all patients in non-AC wards are provided with extra fluids. Monitor for heat stroke symptoms.',
    temp: '38°C',
    humidity: '65%'
  };
}
