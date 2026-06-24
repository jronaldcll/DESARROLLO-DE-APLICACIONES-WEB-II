import { Component, input , ChangeDetectionStrategy} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  ApexChart,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  stroke: ApexStroke;
  labels: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-chart-card2',
    imports: [MatCardModule, NgApexchartsModule, MatIconModule],
    templateUrl: './chart-card2.component.html',
    styleUrl: './chart-card2.component.scss'
})
export class ChartCard2Component {
  public cardChartOptions!: Partial<ChartOptions>;
  readonly title = input<string>('');
  readonly subtitle = input<string>('');

  constructor() {
    this.cardChart();
  }

  private cardChart() {
    this.cardChartOptions = {
      series: [70], // 70% used space
      chart: {
        type: 'radialBar',
        height: 265,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '50%',
          },
          track: {
            show: true,
            background: '#dbdbdb',
            opacity: 1,
            margin: 5,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: '22px',
              show: true,
              formatter: function (val) {
                return val + '%';
              },
            },
          },
        },
      },
      fill: {
        colors: ['#FFA726'], // Orange gradient
      },
      stroke: {
        lineCap: 'round',
      },
      colors: ['#FFA726'],
      labels: ['Occupied Rooms'],
    };
  }
}
