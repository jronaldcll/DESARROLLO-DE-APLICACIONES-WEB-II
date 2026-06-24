import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-equipment-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    NgScrollbar,
  ],
  templateUrl: './equipment-maintenance.component.html',
  styleUrl: './equipment-maintenance.component.scss',
})
export class EquipmentMaintenanceComponent {
  machines = [
    { name: 'MRI Scanner 1', health: 92, status: 'Optimal', color: 'primary' },
    {
      name: 'CT System - East',
      health: 45,
      status: 'Due for Service',
      color: 'warn',
    },
    { name: 'X-Ray Machine B', health: 78, status: 'Stable', color: 'accent' },
    { name: 'Dialysis Unit 4', health: 88, status: 'Optimal', color: 'primary' },
    { name: 'Ventilator System V2', health: 62, status: 'Stable', color: 'accent' },
  ];
}
