import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-db2-quick-info-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './db2-quick-info-grid.component.html',
  styleUrl: './db2-quick-info-grid.component.scss',
})
export class Db2QuickInfoGridComponent {
  items = [
    {
      label: 'Appointments',
      value: 428,
      icon: 'event_available',
      color: 'bg-blue-light',
    },
    {
      label: 'Doctors',
      value: 67,
      icon: 'medical_services',
      color: 'bg-indigo-light',
    },
    {
      label: 'Staff members',
      value: 214,
      icon: 'groups',
      color: 'bg-purple-light',
    },
    {
      label: 'Operations',
      value: 287,
      icon: 'biotech',
      color: 'bg-pink-light',
    },
    { label: 'Admitted', value: 372, icon: 'bed', color: 'bg-orange-light' },
    {
      label: 'Discharged',
      value: 398,
      icon: 'exit_to_app',
      color: 'bg-teal-light',
    },
  ];
}
