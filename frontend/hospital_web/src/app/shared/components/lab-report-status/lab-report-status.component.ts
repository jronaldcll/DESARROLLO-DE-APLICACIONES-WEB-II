import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import {
  NgApexchartsModule,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexDataLabels,
} from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lab-report-status',
  standalone: true,
  imports: [NgApexchartsModule, MatCardModule],
  templateUrl: './lab-report-status.component.html',
  styleUrl: './lab-report-status.component.scss',
})
export class LabReportStatusComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [400, 200, 100],
      chart: {
        type: 'pie',
        height: 265,
      },
      labels: ['Completed', 'Processing', 'Pending'],
      colors: ['#4CAF50', '#FFC107', '#F44336'],
      legend: {
        position: 'bottom',
      },
      dataLabels: {
        enabled: true,
      },
    };
  }

  ngOnInit(): void {}
}
