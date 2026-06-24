import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  NgApexchartsModule,
  ApexChart,
  ApexAxisChartSeries,
  ApexStroke,
  ApexFill,
  ApexMarkers,
  ApexXAxis,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  fill: ApexFill;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-staff-performance-radar',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgApexchartsModule],
  templateUrl: './staff-performance-radar.component.html',
  styleUrl: './staff-performance-radar.component.scss',
})
export class StaffPerformanceRadarComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        { name: 'Current Performance', data: [80, 50, 30, 40, 100, 20] },
      ],
      chart: { height: 250, type: 'radar', toolbar: { show: false } },
      xaxis: {
        categories: [
          'Punctuality',
          'Efficiency',
          'Ethics',
          'Teamwork',
          'Skill',
          'Feedback',
        ],
      },
      colors: ['#7c4dff'],
      stroke: { width: 2 },
      fill: { opacity: 0.1 },
      markers: { size: 0 },
      tooltip: { theme: 'dark' },
    };
  }

  ngOnInit(): void {}
}
