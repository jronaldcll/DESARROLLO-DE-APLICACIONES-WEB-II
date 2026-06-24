import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule, ApexNonAxisChartSeries, ApexPlotOptions, ApexChart, ApexFill, ApexStroke } from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';

export type chartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  labels: string[];
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-health-score',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, MatCardModule],
  template: `
    <mat-card class="score-card">
      <mat-card-header>
        <mat-card-title>Health Score</mat-card-title>
      </mat-card-header>
      <mat-card-content class="text-center">
        <apx-chart
          [series]="chartOptions.series!"
          [chart]="chartOptions.chart!"
          [plotOptions]="chartOptions.plotOptions!"
          [fill]="chartOptions.fill!"
          [stroke]="chartOptions.stroke!"
          [labels]="chartOptions.labels!"
          [colors]="chartOptions.colors!"
        ></apx-chart>
        <div class="score-details">
          <p class="status text-success">Excellent Condition</p>
          <p class="desc">Your overall health metrics are 15% better than last month.</p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .score-card {
      border-radius: 20px;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.05);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    }
    .score-details {
      margin-top: -20px;
      .status { font-weight: 700; font-size: 16px; margin-bottom: 5px; }
      .desc { font-size: 13px; color: #96a2b4; }
    }
    :host-context(.dark) {
      .score-card {
        background: #1a202e;
        border-color: rgba(255, 255, 255, 0.05);
      }
    }
  `]
})
export class PatientHealthScoreComponent implements OnInit {
  public chartOptions!: Partial<chartOptions>;
  ngOnInit(): void {
    this.chartOptions = {
      series: [85],
      chart: {
        height: 280,
        type: 'radialBar',
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: { fontSize: '16px', color: '#96a2b4', offsetY: 120 },
            value: {
              offsetY: 76,
              fontSize: '32px',
              color: '#2d3436',
              formatter: function (val) { return val + "%"; }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: { dashArray: 4 },
      labels: ['Overall Score'],
      colors: ['#2ecc71']
    };
  }
}
