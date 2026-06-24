import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  NgApexchartsModule,
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-db2-claims-weekly-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgApexchartsModule],
  templateUrl: './db2-claims-weekly-chart.component.html',
  styleUrl: './db2-claims-weekly-chart.component.scss',
})
export class Db2ClaimsWeeklyChartComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [{ name: 'Claims', data: [38, 41, 12, 18, 82, 45, 20] }],
      chart: { type: 'bar', height: 230, toolbar: { show: false } },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          borderRadius: 4,
          dataLabels: { position: 'top' },
        },
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: { fontSize: '10px', colors: ['#333'] },
      },
      xaxis: {
        categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        position: 'bottom',
      },
      tooltip: { theme: 'dark' },
      colors: ['#3f51b5'],
    };
  }

  ngOnInit(): void {}
}
