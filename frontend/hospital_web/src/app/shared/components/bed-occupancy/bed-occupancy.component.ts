import { Component, input , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexTooltip,
  ApexGrid,
  ApexLegend,
} from 'ng-apexcharts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bed-occupancy',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, NgApexchartsModule],
  templateUrl: './bed-occupancy.component.html',
  styleUrls: ['./bed-occupancy.component.scss'],
})
export class BedOccupancyComponent {
  readonly totalBeds = input(125);
  readonly occupiedBeds = input(80);

  // Example data for each status
  barSeries: ApexAxisChartSeries = [
    { name: 'Not Ready', data: [0, 3, 0, 0, 0, 0, 0, 0] },
    { name: 'Arrived', data: [0, 0, 15, 0, 0, 0, 0, 0] },
    { name: 'Open', data: [0, 0, 0, 45, 0, 0, 0, 0] },
    { name: 'Admitted', data: [0, 0, 0, 0, 29, 0, 0, 0] },
    { name: 'Hold', data: [0, 0, 0, 0, 0, 17, 0, 0] },
    { name: 'Wait', data: [0, 0, 0, 0, 0, 0, 11, 0] },
    { name: 'Registered', data: [0, 0, 0, 0, 0, 0, 0, 5] },
  ];

  barChartOptions = {
    chart: {
      type: 'bar',
      height: 270,
      stacked: true,
      toolbar: { show: false },
      sparkline: { enabled: false },
      foreColor: '#9aa0ac',
    } as ApexChart,
    xaxis: {
      categories: [
        '',
        'Not Ready',
        'Arrived',
        'Open',
        'Admitted',
        'Hold',
        'Wait',
        'Registered',
      ],
      labels: { show: false },
    } as ApexXAxis,
    colors: [
      '#b39ddb', // Not Ready
      '#ffe082', // Arrived
      '#64b5f6', // Open
      '#ff8a80', // Admitted
      '#90caf9', // Hold
      '#a5d6a7', // Wait
      '#ffd54f', // Registered
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        borderRadius: 6,
        dataLabels: { position: 'top' },
      },
    } as ApexPlotOptions,
    dataLabels: {
      enabled: true,
      offsetY: -15,
      style: { fontSize: '11px', colors: ['#9aa0ac'] },
    } as ApexDataLabels,
    tooltip: { enabled: true, theme: 'dark' } as ApexTooltip,
    grid: { show: false } as ApexGrid,
    legend: { show: false } as ApexLegend,
  };

  legendItems = [
    { label: 'Not Ready', color: '#b39ddb' },
    { label: 'Arrived', color: '#ffe082' },
    { label: 'Open', color: '#64b5f6' },
    { label: 'Admitted', color: '#ff8a80' },
    { label: 'Hold', color: '#90caf9' },
    { label: 'Wait', color: '#a5d6a7' },
    { label: 'Registered', color: '#ffd54f' },
  ];
}
