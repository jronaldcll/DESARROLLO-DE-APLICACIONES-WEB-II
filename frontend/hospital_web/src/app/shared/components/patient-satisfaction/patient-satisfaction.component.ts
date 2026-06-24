import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import {
  NgApexchartsModule,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ApexFill,
} from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  fill: ApexFill;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-satisfaction',
  standalone: true,
  imports: [NgApexchartsModule, MatCardModule],
  templateUrl: './patient-satisfaction.component.html',
  styleUrl: './patient-satisfaction.component.scss',
})
export class PatientSatisfactionComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [95],
      chart: {
        height: 250,
        type: 'radialBar',
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: '16px',
              color: undefined,
              offsetY: 120,
            },
            value: {
              offsetY: 76,
              fontSize: '22px',
              color: undefined,
              formatter: function (val) {
                return val + '%';
              },
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 4,
      },
      labels: ['Satisfaction'],
    };
  }

  ngOnInit(): void {}
}
