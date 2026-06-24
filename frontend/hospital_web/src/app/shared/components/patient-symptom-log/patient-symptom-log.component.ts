import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Symptom {
  name: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  date: string;
  icon: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-symptom-log',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="symptom-card">
      <mat-card-header>
        <div class="d-flex justify-content-between align-items-center w-100">
          <mat-card-title>Symptom Tracker</mat-card-title>
          <button mat-icon-button color="primary">
            <mat-icon>add</mat-icon>
          </button>
        </div>
      </mat-card-header>
      <mat-card-content>
        <div class="symptom-list">
          <div *ngFor="let s of symptoms" class="symptom-item">
            <div class="icon-box" [ngClass]="s.severity.toLowerCase()">
              <mat-icon>{{ s.icon }}</mat-icon>
            </div>
            <div class="info">
              <div class="name">{{ s.name }}</div>
              <div class="date">{{ s.date }}</div>
            </div>
            <div class="severity">
              <span class="badge" [ngClass]="s.severity.toLowerCase()">{{
                s.severity
              }}</span>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .symptom-card {
        border-radius: 20px;
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      }
      .symptom-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      .symptom-item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 15px;
        background: rgba(0, 0, 0, 0.02);
        transition: all 0.3s ease;
        &:hover {
          background: rgba(0, 0, 0, 0.04);
        }

        .icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          &.mild {
            background: rgba(76, 175, 80, 0.1);
            color: #4caf50;
          }
          &.moderate {
            background: rgba(255, 152, 0, 0.1);
            color: #ff9800;
          }
          &.severe {
            background: rgba(244, 67, 54, 0.1);
            color: #f44336;
          }
        }

        .info {
          flex: 1;
          .name {
            font-weight: 600;
            font-size: 14px;
            color: #2d3436;
          }
          .date {
            font-size: 11px;
            color: #96a2b4;
          }
        }

        .badge {
          font-size: 10px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 8px;
          &.mild {
            background: #4caf50;
            color: white;
          }
          &.moderate {
            background: #ff9800;
            color: white;
          }
          &.severe {
            background: #f44336;
            color: white;
          }
        }
      }
      :host-context(.dark) {
        .symptom-card {
          background: #1a202e;
          border-color: rgba(255, 255, 255, 0.05);
        }
        .symptom-item {
          background: rgba(255, 255, 255, 0.03);
          .info .name {
            color: #ffffff;
          }
        }
      }
    `,
  ],
})
export class PatientSymptomLogComponent {
  symptoms: Symptom[] = [
    {
      name: 'Headache',
      severity: 'Mild',
      date: 'Today, 08:00 AM',
      icon: 'psychology',
    },
    {
      name: 'Back Pain',
      severity: 'Moderate',
      date: 'Yesterday',
      icon: 'accessibility',
    },
    {
      name: 'Fatigue',
      severity: 'Mild',
      date: '2 days ago',
      icon: 'battery_alert',
    },
  ];
}
