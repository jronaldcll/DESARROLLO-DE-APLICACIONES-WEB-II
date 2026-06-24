import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule, ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexLegend, ApexDataLabels } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-admission-source-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgApexchartsModule],
  templateUrl: './admission-source-chart.component.html',
  styleUrl: './admission-source-chart.component.scss'
})
export class AdmissionSourceChartComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [44, 33, 13],
      chart: { type: 'donut', height: 180 },
      labels: ['Emergency', 'OPD Referral', 'Other'],
      legend: { show: false },
      dataLabels: { enabled: false },
      colors: ['#f44336', '#2196f3', '#ff9800'],
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 } } }]
    };
  }

  ngOnInit(): void {}
}
