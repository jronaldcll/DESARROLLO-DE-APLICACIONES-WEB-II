import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-staff-shift-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgScrollbar,
  ],
  templateUrl: './staff-shift-overview.component.html',
  styleUrl: './staff-shift-overview.component.scss',
})
export class StaffShiftOverviewComponent {
  shifts = [
    {
      name: 'Morning Shift',
      count: 45,
      status: 'Active',
      color: 'text-success',
    },
    {
      name: 'Afternoon Shift',
      count: 38,
      status: 'Upcoming',
      color: 'text-primary',
    },
    { name: 'Night Shift', count: 12, status: 'Closed', color: 'text-muted' },
    { name: 'Weekend Morning', count: 25, status: 'Closed', color: 'text-success' },
    { name: 'On-Call Relief', count: 8, status: 'Pending', color: 'text-primary' },
  ];
}

