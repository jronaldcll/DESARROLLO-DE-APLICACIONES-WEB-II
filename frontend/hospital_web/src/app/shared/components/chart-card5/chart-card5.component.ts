import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend,
  NgApexchartsModule,
  ApexDataLabels,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chart-card5',
  templateUrl: './chart-card5.component.html',
  styleUrls: ['./chart-card5.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    NgApexchartsModule,
    MatIconModule,
  ],
  standalone: true,
})
export class ChartCard5Component {
  public chartOptions: Partial<ChartOptions>;

  activeTab: 'Daily' | 'Weekly' | 'Monthly' = 'Daily';
  total = 0;
  readonly tabs: Array<'Daily' | 'Weekly' | 'Monthly'> = [
    'Daily',
    'Weekly',
    'Monthly',
  ];

  readonly chartData = {
    Daily: {
      series: [22, 15, 20, 18],
      total: 75,
    },
    Weekly: {
      series: [95, 80, 90, 85],
      total: 350,
    },
    Monthly: {
      series: [320, 280, 370, 317],
      total: 1287,
    },
  };

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'donut',
        height: 220,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Dengue', 'Typhoid', 'Malaria', 'Cold'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      colors: ['#7a7eea', '#d88b36', '#3e4a6a', '#8b99b9'],
    };

    this.setChartData('Daily');
  }

  setChartData(tab: 'Daily' | 'Weekly' | 'Monthly') {
    this.activeTab = tab;
    const data = this.chartData[tab];
    this.chartOptions.series = [...data.series];
    this.total = data.total;
  }

  getIcon(label: string): string {
    const lower = label.toLowerCase();

    if (lower.includes('Dengue')) return 'coronavirus';
    if (lower.includes('Typhoid')) return 'coronavirus';
    if (lower.includes('Malaria')) return 'coronavirus';

    return 'coronavirus';
  }
}
