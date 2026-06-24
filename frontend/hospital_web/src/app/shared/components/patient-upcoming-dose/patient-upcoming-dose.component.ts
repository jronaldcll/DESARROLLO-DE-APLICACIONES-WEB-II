import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-upcoming-dose',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="dose-card glass-card">
      <div class="glow-bg"></div>
      <mat-card-content>
        <div class="d-flex align-items-center justify-content-between mb-4">
          <div class="dose-badge">Next Dose</div>
          <div class="time-rem">In 45 Mins</div>
        </div>
        
        <div class="medication-main">
          <div class="icon-orb">
            <mat-icon>medication</mat-icon>
          </div>
          <div class="med-info">
            <h3 class="med-name">Amoxicillin</h3>
            <p class="med-dosage">500mg • After Meal</p>
          </div>
        </div>

        <div class="dose-schedule">
          <div class="schedule-item completed">
            <mat-icon>check_circle</mat-icon>
            <span>08:00 AM</span>
          </div>
          <div class="schedule-item active">
            <div class="pulse-dot"></div>
            <span>01:00 PM</span>
          </div>
          <div class="schedule-item">
            <div class="empty-dot"></div>
            <span>08:00 PM</span>
          </div>
        </div>

        <button mat-flat-button class="take-btn w-100 mt-4">
          Mark as Taken
        </button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .dose-card {
      border-radius: 28px;
      position: relative;
      overflow: hidden;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.05);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    }

    .glow-bg {
      position: absolute;
      top: -50px;
      right: -50px;
      width: 150px;
      height: 150px;
      background: radial-gradient(circle, rgba(108, 92, 231, 0.3) 0%, rgba(108, 92, 231, 0) 70%);
      filter: blur(20px);
    }

    .dose-badge {
      background: #6c5ce7;
      color: white;
      padding: 4px 12px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .time-rem {
      font-size: 12px;
      font-weight: 700;
      color: #6c5ce7;
    }

    .medication-main {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 25px;

      .icon-orb {
        width: 56px;
        height: 56px;
        background: white;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6c5ce7;
        box-shadow: 0 10px 20px rgba(108, 92, 231, 0.15);

        mat-icon {
          font-size: 28px;
          width: 28px;
          height: 28px;
        }
      }

      .med-name {
        margin: 0;
        font-size: 20px;
        font-weight: 800;
        color: #2d3436;
      }

      .med-dosage {
        margin: 0;
        font-size: 13px;
        color: #636e72;
        font-weight: 600;
      }
    }

    .dose-schedule {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 20px;
        right: 20px;
        height: 2px;
        background: rgba(0, 0, 0, 0.05);
        z-index: 0;
      }

      .schedule-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        position: relative;
        z-index: 1;

        span {
          font-size: 10px;
          font-weight: 700;
          color: #b2bec3;
        }

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
          color: #2ecc71;
          background: white;
          border-radius: 50%;
        }

        .pulse-dot {
          width: 12px;
          height: 12px;
          background: #6c5ce7;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 0 rgba(108, 92, 231, 0.4);
          animation: pulseDose 2s infinite;
        }

        .empty-dot {
          width: 12px;
          height: 12px;
          background: #dfe6e9;
          border-radius: 50%;
          border: 3px solid white;
        }

        &.active span {
          color: #6c5ce7;
        }
      }
    }

    .take-btn {
      background: #6c5ce7 !important;
      color: white !important;
      border-radius: 16px;
      padding: 24px !important;
      font-weight: 700;
      font-size: 15px;
      box-shadow: 0 8px 16px rgba(108, 92, 231, 0.2);
    }

    @keyframes pulseDose {
      0% { box-shadow: 0 0 0 0 rgba(108, 92, 231, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(108, 92, 231, 0); }
      100% { box-shadow: 0 0 0 0 rgba(108, 92, 231, 0); }
    }

    :host-context(.dark) {
      .dose-card {
        background: #1a202e;
        border-color: rgba(255, 255, 255, 0.05);
      }
      .medication-main {
        .icon-orb { background: rgba(0, 0, 0, 0.2); }
        .med-name { color: #ffffff; }
        .med-dosage { color: #96a2b4; }
      }
      .dose-schedule {
        &::before { background: rgba(255, 255, 255, 0.1); }
        .schedule-item {
          mat-icon, .pulse-dot, .empty-dot { border-color: #1a202e; }
          mat-icon { background: #1a202e; }
        }
      }
    }
  `]
})
export class PatientUpcomingDoseComponent {}
