import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-db2-welcome-banner',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './db2-welcome-banner.component.html',
  styleUrl: './db2-welcome-banner.component.scss'
})
export class Db2WelcomeBannerComponent {
  stats = [
    { label: 'New Patients', value: 12, icon: 'person_add', color: 'chip-cyan' },
    { label: 'Surgeries', value: 5, icon: 'medical_services', color: 'chip-green' },
    { label: 'Discharges', value: 8, icon: 'exit_to_app', color: 'chip-orange' }
  ];
}
