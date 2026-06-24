import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  NgApexchartsModule,
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexYAxis,
  ApexTooltip,
} from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-blood-bank-stock',
  standalone: true,
  imports: [NgApexchartsModule, MatCardModule],
  templateUrl: './blood-bank-stock.component.html',
  styleUrl: './blood-bank-stock.component.scss',
})
export class BloodBankStockComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Units',
          data: [45, 52, 38, 24, 33, 10, 6, 12],
        },
      ],
      chart: {
        type: 'bar',
        height: 250,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      },
      colors: [
        '#F44336',
        '#E91E63',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#2196F3',
        '#03A9F4',
        '#00BCD4',
      ],
      tooltip: {
        theme: 'dark',
      },
    };
  }

  ngOnInit(): void {}
}
