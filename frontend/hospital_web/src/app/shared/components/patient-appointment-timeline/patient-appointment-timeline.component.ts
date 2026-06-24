import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface TimelineItem {
  title: string;
  time: string;
  doctor: string;
  type: string;
  status: 'upcoming' | 'past' | 'ongoing';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-appointment-timeline',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="timeline-card">
      <mat-card-header>
        <mat-card-title>Medical Journey</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="timeline-container">
          <div *ngFor="let item of events" class="timeline-item" [ngClass]="item.status">
            <div class="timeline-marker">
              <mat-icon *ngIf="item.status === 'upcoming'">event</mat-icon>
              <mat-icon *ngIf="item.status === 'past'">check_circle</mat-icon>
              <mat-icon *ngIf="item.status === 'ongoing'">pending</mat-icon>
            </div>
            <div class="timeline-content">
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="title">{{item.title}}</h4>
                <span class="time">{{item.time}}</span>
              </div>
              <p class="subtitle">with {{item.doctor}} • {{item.type}}</p>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .timeline-card {
      border-radius: 20px;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.05);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    }
    .timeline-container {
      position: relative;
      padding-left: 30px;
      &::before {
        content: '';
        position: absolute;
        left: 10px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: rgba(0, 0, 0, 0.05);
      }
    }
    .timeline-item {
      position: relative;
      margin-bottom: 25px;
      &:last-child { margin-bottom: 0; }
      
      .timeline-marker {
        position: absolute;
        left: -32px;
        top: 0;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        mat-icon { font-size: 16px; width: 16px; height: 16px; }
      }

      .timeline-content {
        .title { margin: 0; font-size: 14px; font-weight: 700; color: #2d3436; }
        .time { font-size: 11px; font-weight: 600; color: #96a2b4; }
        .subtitle { margin: 2px 0 0; font-size: 12px; color: #636e72; }
      }

      &.upcoming .timeline-marker { color: #3498db; border: 2px solid #3498db; }
      &.past .timeline-marker { color: #2ecc71; border: 2px solid #2ecc71; }
      &.ongoing .timeline-marker { color: #e67e22; border: 2px solid #e67e22; }
    }
    :host-context(.dark) {
      .timeline-card { background: #1a202e; border-color: rgba(255, 255, 255, 0.05); }
      .timeline-container::before { background: rgba(255, 255, 255, 0.1); }
      .timeline-item {
        .timeline-marker { background: #1a202e; }
        .timeline-content {
          .title { color: #ffffff; }
          .subtitle { color: #96a2b4; }
        }
      }
    }
  `]
})
export class PatientAppointmentTimelineComponent {
  events: TimelineItem[] = [
    { title: 'Cardiology Follow-up', time: 'Tomorrow, 10:00 AM', doctor: 'Dr. John Doe', type: 'Clinical Visit', status: 'upcoming' },
    { title: 'Blood Test Results', time: 'Yesterday, 02:30 PM', doctor: 'Lab Dept', type: 'Diagnostic', status: 'past' },
    { title: 'Annual Checkup', time: '15 June, 09:00 AM', doctor: 'Dr. Sarah Smith', type: 'Routine', status: 'upcoming' }
  ];
}
