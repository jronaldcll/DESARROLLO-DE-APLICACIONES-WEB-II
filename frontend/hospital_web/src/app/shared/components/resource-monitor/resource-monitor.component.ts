import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-resource-monitor',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './resource-monitor.component.html',
  styleUrl: './resource-monitor.component.scss'
})
export class ResourceMonitorComponent {
  resources = [
    { name: 'Oxygen Level', value: '85%', icon: 'air', color: 'text-success' },
    { name: 'Blood Bank', value: 'Critical', icon: 'bloodtype', color: 'text-danger' },
    { name: 'Backup Power', value: 'Stable', icon: 'power', color: 'text-primary' },
    { name: 'Water Supply', value: 'Normal', icon: 'water_drop', color: 'text-info' }
  ];
}
