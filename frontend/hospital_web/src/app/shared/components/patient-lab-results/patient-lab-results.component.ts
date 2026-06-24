import { Component, input , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

export interface LabResult {
  testName: string;
  date: string;
  result: string;
  status: 'Normal' | 'High' | 'Low';
  unit: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-lab-results',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule],
  template: `
    <mat-card class="lab-card">
      <mat-card-header>
        <mat-card-title>Recent Lab Results</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="table-responsive">
          <table mat-table [dataSource]="results()">
            <ng-container matColumnDef="testName">
              <th mat-header-cell *matHeaderCellDef>Test Name</th>
              <td mat-cell *matCellDef="let element">
                <span class="fw-600">{{ element.testName }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let element">{{ element.date }}</td>
            </ng-container>

            <ng-container matColumnDef="result">
              <th mat-header-cell *matHeaderCellDef>Result</th>
              <td mat-cell *matCellDef="let element">
                <span class="fw-700">{{ element.result }}</span>
                <span class="unit">{{ element.unit }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let element">
                <span
                  class="status-pill"
                  [ngClass]="element.status.toLowerCase()"
                >
                  {{ element.status }}
                </span>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .table-responsive {
        width: 100%;
        overflow-x: auto;
      }
      table {
        width: 100%;
        background: transparent;
      }
      .fw-600 {
        font-weight: 600;
      }
      .fw-700 {
        font-weight: 700;
      }
      .unit {
        font-size: 11px;
        color: #96a2b4;
        margin-left: 2px;
      }
      .status-pill {
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 700;
        &.normal {
          background: rgba(76, 175, 80, 0.1);
          color: #4caf50;
        }
        &.high {
          background: rgba(244, 67, 54, 0.1);
          color: #f44336;
        }
        &.low {
          background: rgba(255, 152, 0, 0.1);
          color: #ff9800;
        }
      }
      :host-context(.dark) {
        .lab-card {
          background: #1a202e;
          border-color: rgba(255, 255, 255, 0.05);
        }
        th {
          color: #96a2b4;
          border-bottom-color: rgba(255, 255, 255, 0.05);
        }
        td {
          color: #ffffff;
          border-bottom-color: rgba(255, 255, 255, 0.05);
        }
      }
    `,
  ],
})
export class PatientLabResultsComponent {
  results = input.required<LabResult[]>();
  displayedColumns: string[] = ['testName', 'date', 'result', 'status'];
}
