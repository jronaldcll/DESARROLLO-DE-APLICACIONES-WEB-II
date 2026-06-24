import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgApexchartsModule,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ApexStroke,
} from 'ng-apexcharts';
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
  selector: 'app-patient-calorie-gauge',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, MatCardModule],
  template: `
    <mat-card class="calorie-card">
      <mat-card-header>
        <mat-card-title>Calorie Intake</mat-card-title>
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
        <div class="stats-footer row">
          <div class="col-6 border-right">
            <div class="val">1,450</div>
            <div class="lab">Consumed</div>
          </div>
          <div class="col-6">
            <div class="val">2,200</div>
            <div class="lab">Goal</div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .calorie-card {
        border-radius: 20px;
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      }
      .stats-footer {
        .border-right {
          border-right: 1px solid rgba(0, 0, 0, 0.05);
        }
        .val {
          font-weight: 700;
          font-size: 18px;
          color: #2d3436;
        }
        .lab {
          font-size: 11px;
          color: #96a2b4;
          text-transform: uppercase;
        }
      }
      :host-context(.dark) {
        .calorie-card {
          background: #1a202e;
          border-color: rgba(255, 255, 255, 0.05);
        }
        .stats-footer {
          .border-right {
            border-right-color: rgba(255, 255, 255, 0.1);
          }
          .val {
            color: #ffffff;
          }
        }
      }
    `,
  ],
})
export class PatientCalorieGaugeComponent implements OnInit {
  public chartOptions!: Partial<chartOptions>;
  ngOnInit(): void {
    this.chartOptions = {
      series: [65],
      chart: {
        height: 230,
        type: 'radialBar',
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#e7e7e7',
            strokeWidth: '97%',
            margin: 5,
            dropShadow: { enabled: false },
          },
          dataLabels: {
            name: { show: false },
            value: {
              offsetY: -2,
              fontSize: '22px',
              fontWeight: '700',
              color: '#2d3436',
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: ['Average Results'],
      colors: ['#3498db'],
    };
  }
}
