import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  NgApexchartsModule,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexPlotOptions,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-db2-gender-dist-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgApexchartsModule],
  templateUrl: './db2-gender-dist-chart.component.html',
  styleUrl: './db2-gender-dist-chart.component.scss',
})
export class Db2GenderDistChartComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [45, 35, 20],
      chart: { type: 'donut', height: 240 },
      labels: ['Male', 'Female', 'Kids'],
      legend: { position: 'bottom' },
      plotOptions: { pie: { donut: { size: '70%' } } },
      colors: ['#2196f3', '#e91e63', '#4caf50'],
    };
  }

  ngOnInit(): void {}
}
