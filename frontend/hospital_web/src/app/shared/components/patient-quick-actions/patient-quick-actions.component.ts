import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface QuickAction {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-quick-actions',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="row">
      <div
        *ngFor="let action of actions"
        class="col-xl-4 col-lg-4 col-md-12 col-sm-12"
      >
        <div class="action-card" [ngClass]="action.color">
          <div class="icon-orb" [ngClass]="action.color + '-orb'">
            <mat-icon>{{ action.icon }}</mat-icon>
          </div>
          <div class="text-content">
            <h4 class="title">{{ action.title }}</h4>
            <p class="subtitle">{{ action.subtitle }}</p>
          </div>
          <div class="arrow-btn">
            <mat-icon>chevron_right</mat-icon>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .action-card {
        display: flex;
        align-items: center;
        padding: 20px;
        border-radius: 24px;
        margin-bottom: 24px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        position: relative;
        overflow: hidden;

        &:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

          .arrow-btn {
            transform: translateX(5px);
            opacity: 1;
          }
        }

        .icon-orb {
          width: 50px;
          height: 50px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-right: 15px;

          mat-icon {
            font-size: 24px;
          }
        }

        .text-content {
          flex: 1;
          .title {
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            color: #2d3436;
          }
          .subtitle {
            margin: 0;
            font-size: 12px;
            color: #636e72;
            font-weight: 500;
          }
        }

        .arrow-btn {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.5;
          transition: all 0.3s ease;

          mat-icon {
            font-size: 18px;
            width: 18px;
            height: 18px;
          }
        }

        &.blue {
          background: linear-gradient(
            135deg,
            rgba(160, 217, 255, 0.47),
            rgba(0, 153, 255, 0.38)
          );
          .blue-orb {
            background: #3498db;
          }
        }
        &.indigo {
          background: linear-gradient(
            135deg,
            rgba(166, 153, 255, 0.31),
            rgba(69, 44, 255, 0.28)
          );
          .indigo-orb {
            background: #6c5ce7;
          }
        }
        &.teal {
          background: linear-gradient(
            135deg,
            rgba(123, 231, 210, 0.24),
            rgba(0, 181, 145, 0.37)
          );
          .teal-orb {
            background: #1abc9c;
          }
        }
      }

      :host-context(.dark) {
        .action-card {
          background: #1a202e;
          border-color: rgba(255, 255, 255, 0.05);
          .text-content {
            .title {
              color: #ffffff;
            }
            .subtitle {
              color: #96a2b4;
            }
          }
          .arrow-btn {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
          }
        }
      }
    `,
  ],
})
export class PatientQuickActionsComponent {
  actions: QuickAction[] = [
    {
      title: 'Book Appointment',
      subtitle: 'Find your doctor',
      icon: 'event',
      color: 'blue',
    },
    {
      title: 'Message Doctor',
      subtitle: 'Quick health query',
      icon: 'chat',
      color: 'indigo',
    },
    {
      title: 'Health Records',
      subtitle: 'View lab results',
      icon: 'description',
      color: 'teal',
    },
  ];
}
