import { CommonModule } from '@angular/common';
import { Component , ChangeDetectionStrategy} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-project-hours',
  imports: [CommonModule],
  templateUrl: './project-hours.component.html',
  styleUrl: './project-hours.component.scss',
})
export class ProjectHoursComponent {
  // Sample data
  completedHours: number = 3487;
  expectedHours: number = 10000;

  // Data for progress bars
  progressBars = [
    { color: 'bg-red', percentage: 33 },
    { color: 'bg-blue', percentage: 25 },
    { color: 'bg-amber', percentage: 12 },
    { color: 'bg-purple', percentage: 10 },
    { color: 'bg-green', percentage: 7 },
    { color: 'bg-cyan', percentage: 13 },
  ];

  // Projects data
  tasks = [
    { name: 'Patient Diagnosis', completed: 33, color: 'col-red' },
    { name: 'Surgical Procedure', completed: 25, color: 'col-blue' },
    { name: 'Prescription Management', completed: 12, color: 'col-amber' },
    { name: 'Patient Monitoring', completed: 10, color: 'col-purple' },
    { name: 'Medical Research', completed: 7, color: 'col-green' },
    { name: 'Consultation Scheduling', completed: 13, color: 'col-cyan' },
  ];
}
