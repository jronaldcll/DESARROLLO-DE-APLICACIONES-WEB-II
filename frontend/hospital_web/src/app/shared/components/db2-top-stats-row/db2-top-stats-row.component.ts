import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-db2-top-stats-row',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './db2-top-stats-row.component.html',
  styleUrl: './db2-top-stats-row.component.scss'
})
export class Db2TopStatsRowComponent {
  stats = [
    { label: 'New Patients', value: '315', icon: 'person_add', trend: '+15%', color: 'blue' },
    { label: 'OPD Consultations', value: '284', icon: 'medical_services', trend: '+12%', color: 'indigo' },
    { label: 'Laboratory Tests', value: '742', icon: 'biotech', trend: '+8%', color: 'purple' },
    { label: 'Hospital Revenue', value: '$124.5k', icon: 'payments', trend: '+22%', color: 'teal' }
  ];
}
