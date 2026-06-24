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

export type chartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  fill: ApexFill;
  legend: ApexLegend;
  markers: ApexMarkers;
  grid: ApexGrid;
  colors: string[];
  tooltip: ApexTooltip;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-weight-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, MatCardModule],
  template: `
    <mat-card class="weight-card">
      <mat-card-header>
        <mat-card-title>Weight Progress</mat-card-title>
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
          [grid]="chartOptions.grid!"
          [colors]="chartOptions.colors!"
          [tooltip]="chartOptions.tooltip!"
          [markers]="chartOptions.markers!"
        ></apx-chart>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .weight-card {
        border-radius: 20px;
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      }
      :host-context(.dark) {
        .weight-card {
          background: #1a202e;
          border-color: rgba(255, 255, 255, 0.05);
        }
      }
    `,
  ],
})
export class PatientWeightChartComponent implements OnInit {
  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: 'Weight',
          data: [82, 81.5, 80.8, 81, 79.5, 78.8, 78],
        },
      ],
      chart: {
        height: 320,
        type: 'area',
        toolbar: { show: false },
        foreColor: '#9aa0ac',
      },
      colors: ['#2ecc71'],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 3 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
      yaxis: {
        title: { text: 'Weight (kg)' },
      },
      grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 4,
      },
      markers: {
        size: 4,
        colors: ['#2ecc71'],
        strokeColors: '#fff',
        strokeWidth: 2,
      },
      tooltip: { theme: 'dark' },
    };
  }
  public chartOptions!: Partial<chartOptions>;
}
