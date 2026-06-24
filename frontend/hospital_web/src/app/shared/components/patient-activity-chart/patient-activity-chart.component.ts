import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexMarkers,
  ApexGrid,
  ApexTooltip,
} from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export type chartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis | ApexYAxis[];
  fill: ApexFill;
  legend: ApexLegend;
  markers: ApexMarkers;
  grid: ApexGrid;
  colors: string[];
  tooltip: ApexTooltip;
  labels: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-activity-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="activity-card">
      <mat-card-header>
        <div class="header-content w-100">
          <mat-card-title>Weekly Activity</mat-card-title>
        </div>
      </mat-card-header>
      <mat-card-content>
        <apx-chart
          [series]="chartOptions.series!"
          [chart]="chartOptions.chart!"
          [xaxis]="chartOptions.xaxis!"
          [stroke]="chartOptions.stroke!"
          [dataLabels]="chartOptions.dataLabels!"
          [yaxis]="chartOptions.yaxis!"
          [fill]="chartOptions.fill!"
          [legend]="chartOptions.legend!"
          [markers]="chartOptions.markers!"
          [grid]="chartOptions.grid!"
          [colors]="chartOptions.colors!"
          [tooltip]="chartOptions.tooltip!"
          [labels]="chartOptions.labels!"
        ></apx-chart>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
      }
      .stats-summary {
        display: flex;
        gap: 20px;
        .stat-item {
          display: flex;
          align-items: center;
          gap: 10px;
          &.border-left {
            padding-left: 20px;
            border-left: 1px solid rgba(0, 0, 0, 0.05);
          }
          .details {
            display: flex;
            flex-direction: column;
            .label {
              font-size: 11px;
              font-weight: 700;
              color: #b2bec3;
              text-transform: uppercase;
            }
            .val {
              font-size: 14px;
              font-weight: 800;
              color: #2d3436;
            }
          }
        }
      }
      :host-context(.dark) {
        .activity-card {
          background: #1a202e;
          border-color: rgba(255, 255, 255, 0.05);
        }
        .stats-summary .stat-item {
          &.border-left {
            border-left-color: rgba(255, 255, 255, 0.1);
          }
          .details .val {
            color: #ffffff;
          }
        }
      }
    `,
  ],
})
export class PatientActivityChartComponent implements OnInit {
  public chartOptions!: Partial<chartOptions>;
  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: 'Steps',
          type: 'column',
          data: [4400, 5050, 4140, 6710, 2270, 4130, 2010],
        },
        {
          name: 'Calories',
          type: 'line',
          data: [123, 142, 135, 127, 143, 122, 117],
        },
      ],
      chart: {
        height: 300,
        type: 'line',
        toolbar: { show: false },
        foreColor: '#9aa0ac',
      },
      stroke: { width: [0, 4], curve: 'smooth' },
      dataLabels: { enabled: false },
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      xaxis: { type: 'category' },
      yaxis: [
        { title: { text: 'Steps' } },
        { opposite: true, title: { text: 'Calories' } },
      ],
      colors: ['#3498db', '#e67e22'],
      fill: { opacity: [0.85, 1], type: 'solid' },
      grid: { borderColor: '#f1f1f1', strokeDashArray: 4 },
      legend: { position: 'top', horizontalAlign: 'right' },
      tooltip: { shared: true, intersect: false, theme: 'dark' },
    };
  }
}
