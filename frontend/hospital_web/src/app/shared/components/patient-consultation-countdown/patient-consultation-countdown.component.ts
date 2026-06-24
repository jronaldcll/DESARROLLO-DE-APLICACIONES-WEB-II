import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-consultation-countdown',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card class="countdown-card">
      <mat-card-content>
        <div class="content-wrapper">
          <div class="header">
            <span class="badge">Live Consult</span>
            <div class="status-dot"></div>
          </div>

          <div class="doctor-profile">
            <img src="assets/images/user/user2.jpg" alt="Doctor" />
            <div class="details">
              <h3>Dr. Emily Watson</h3>
              <p>Cardiologist • Online</p>
            </div>
          </div>

          <div class="timer-grid">
            <div class="timer-box">
              <span class="val">02</span>
              <span class="lab">Days</span>
            </div>
            <div class="timer-box">
              <span class="val">14</span>
              <span class="lab">Hrs</span>
            </div>
            <div class="timer-box">
              <span class="val">36</span>
              <span class="lab">Mins</span>
            </div>
          </div>

          <div class="actions">
            <button mat-flat-button class="join-btn">
              <mat-icon>videocam</mat-icon>
              Join Consultation
            </button>
            <button mat-stroked-button class="reschedule-btn">
              Reschedule
            </button>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .badge {
          background: #e8f5e9;
          color: #4caf50;
          padding: 4px 12px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .status-dot {
          width: 10px;
          height: 10px;
          background: #4caf50;
          border-radius: 50%;
          box-shadow: 0 0 0 rgba(76, 175, 80, 0.4);
          animation: pulse 1.5s infinite;
        }
      }
      .doctor-profile {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 25px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 15px;
          object-fit: cover;
        }
        h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 800;
          color: #2d3436;
        }
        p {
          margin: 0;
          font-size: 12px;
          color: #636e72;
          font-weight: 600;
        }
      }
      .timer-grid {
        display: flex;
        gap: 10px;
        margin-bottom: 25px;
        .timer-box {
          flex: 1;
          background: rgba(0, 0, 0, 0.02);
          padding: 10px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .val {
            font-size: 20px;
            font-weight: 800;
            color: #2d3436;
          }
          .lab {
            font-size: 10px;
            color: #96a2b4;
            text-transform: uppercase;
            font-weight: 700;
          }
        }
      }
      .actions {
        display: flex;
        flex-direction: column;
        gap: 20px;
        .join-btn {
          background: #6c5ce7 !important;
          color: white !important;
          border-radius: 12px;
          padding: 12px !important;
          font-weight: 700;
        }
        .reschedule-btn {
          border-radius: 12px;
          padding: 12px !important;
          font-weight: 600;
          border-color: rgba(0, 0, 0, 0.05) !important;
        }
      }
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4);
        }
        70% {
          box-shadow: 0 0 0 8px rgba(76, 175, 80, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
        }
      }
      :host-context(.dark) {
        .countdown-card {
          background: #1a202e;
          border-color: rgba(255, 255, 255, 0.05);
        }
        .doctor-profile h3 {
          color: #ffffff;
        }
        .timer-box {
          background: rgba(255, 255, 255, 0.03);
          .val {
            color: #ffffff;
          }
        }
        .reschedule-btn {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
      }
    `,
  ],
})
export class PatientConsultationCountdownComponent {}
