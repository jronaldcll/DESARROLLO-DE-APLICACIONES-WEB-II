import { Component, input , ChangeDetectionStrategy} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexPlotOptions,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  colors: string[];
  tooltip?: ApexTooltip;
  yaxis?: ApexYAxis;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chart-card1',
  imports: [MatCardModule, NgApexchartsModule, MatIconModule],
  templateUrl: './chart-card1.component.html',
  styleUrl: './chart-card1.component.scss',
})
export class ChartCard1Component {
  public cardChartOptions!: Partial<ChartOptions>;

  readonly title = input<string>('');
  readonly subtitle = input<string>('');

  constructor() {
    this.cardChart();
  }

  private cardChart() {
    this.cardChartOptions = {
      series: [
        {
          name: 'Patients',
          data: [150, 600, 300, 450, 225],
        },
      ],
      chart: {
        type: 'bar',
        height: 330,
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 5,
          horizontal: false,
        },
      },
      colors: ['#d3d3d3', '#55B11A', '#d3d3d3', '#d3d3d3', '#d3d3d3'], // Green for 2020
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: ['2021', '2020', '2019', '2018', '2017'],
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
}
