import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  NgApexchartsModule,
  ApexChart,
  ApexAxisChartSeries,
  ApexStroke,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dept-discharge-trends',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgApexchartsModule],
  templateUrl: './dept-discharge-trends.component.html',
  styleUrl: './dept-discharge-trends.component.scss',
})
export class DeptDischargeTrendsComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [{ name: 'Discharges', data: [31, 40, 28, 51, 42, 109, 100] }],
      chart: { type: 'area', height: 100, sparkline: { enabled: true } },
      stroke: { curve: 'smooth', width: 2 },
      tooltip: {
        theme: 'dark',
        fixed: { enabled: false },
        x: { show: false },
        marker: { show: false },
      },
      colors: ['#4caf50'],
    };
  }

  ngOnInit(): void {}
}
