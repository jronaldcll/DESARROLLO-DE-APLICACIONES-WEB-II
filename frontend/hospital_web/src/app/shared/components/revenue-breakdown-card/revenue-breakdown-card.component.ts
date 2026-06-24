import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-revenue-breakdown-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './revenue-breakdown-card.component.html',
  styleUrl: './revenue-breakdown-card.component.scss'
})
export class RevenueBreakdownCardComponent {
  streams = [
    { source: 'Inpatient Department', amount: '$124,500', share: 55, icon: 'bed' },
    { source: 'Outpatient Clinic', amount: '$68,200', share: 30, icon: 'medical_services' },
    { source: 'Pharmacy & Diagnostics', amount: '$34,100', share: 15, icon: 'biotech' }
  ];
}
