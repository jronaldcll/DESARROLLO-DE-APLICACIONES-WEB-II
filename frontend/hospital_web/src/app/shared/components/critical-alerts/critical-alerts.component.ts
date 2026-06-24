import { Component, input, output , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface CriticalAlert {
  id: string;
  img: string;
  patientName: string;
  roomNumber: string;
  alertType: string;
  message: string;
  time: string;
  timestamp: string;
  severity: string;
  severityClass: string;
  isNew: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-critical-alerts',
  standalone: true,
  templateUrl: './critical-alerts.component.html',
  styleUrls: ['./critical-alerts.component.scss'],
  imports: [
    CommonModule,
    NgScrollbar,
    MatCardModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CriticalAlertsComponent {
  readonly alerts = input<CriticalAlert[]>([]);

  readonly acknowledge = output<CriticalAlert>();
  readonly viewDetails = output<CriticalAlert>();

  // Count of new alerts
  getNewAlertsCount(): number {
    return this.alerts().filter((a) => a.isNew).length;
  }

  markAsRead(alert: CriticalAlert) {
    this.acknowledge.emit(alert);
  }

  viewAlert(alert: CriticalAlert) {
    this.viewDetails.emit(alert);
  }
}
