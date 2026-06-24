
import { Component, OnInit, input , ChangeDetectionStrategy} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexLegend,
  ApexXAxis,
  ApexDataLabels,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-appointment-trends-widget',
  templateUrl: './appointment-trends-widget.component.html',
  styleUrls: ['./appointment-trends-widget.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgApexchartsModule
],
})
export class AppointmentTrendsWidgetComponent implements OnInit {
  readonly trendsData = input<{
    name: string;
    data: number[];
    color?: string;
}[]>([
    { name: 'Completed', data: [30, 40, 35, 50, 49, 60, 70], color: '#28a745' },
    { name: 'Cancelled', data: [5, 7, 6, 8, 7, 5, 6], color: '#dc3545' },
]);
  readonly categories = input<string[]>([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
]);

  chartOptions:
    | {
        series: ApexAxisChartSeries;
        chart: ApexChart;
        colors: string[];
        dataLabels: ApexDataLabels;
        stroke: ApexStroke;
        xaxis: ApexXAxis;
        legend: ApexLegend;
        fill: ApexFill;
        tooltip: ApexTooltip;
      }
    | undefined;

  completedTotal = 0;
  cancelledTotal = 0;

  ngOnInit() {
    this.completedTotal =
      this.trendsData()[0]?.data?.reduce((acc, val) => acc + val, 0) || 0;
    this.cancelledTotal =
      this.trendsData()[1]?.data?.reduce((acc, val) => acc + val, 0) || 0;

    this.chartOptions = {
      series: this.trendsData().map((s) => ({ name: s.name, data: s.data })),
      chart: {
        type: 'area',
        height: 180,
        toolbar: { show: false },
        sparkline: { enabled: false },
        foreColor: '#9aa0ac',
      },
      colors: this.trendsData().map((s) => s.color || '#007bff'),
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' as const, width: 2 },
      xaxis: { categories: this.categories() },
      legend: { show: true, position: 'top', horizontalAlign: 'right' },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.05,
          stops: [0, 90, 100],
        },
      },
      tooltip: { enabled: true },
    };
  }
}
