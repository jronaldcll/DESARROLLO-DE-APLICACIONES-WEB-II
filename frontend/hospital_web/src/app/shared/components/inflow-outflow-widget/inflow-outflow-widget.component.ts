import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
} from 'ng-apexcharts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inflow-outflow-widget',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, NgApexchartsModule],
  templateUrl: './inflow-outflow-widget.component.html',
  styleUrls: ['./inflow-outflow-widget.component.scss'],
})
export class InflowOutflowWidgetComponent {
  inflow = 128;
  inflowChange = '+12% vs last week';
  outflow = 97;
  outflowChange = '-5% vs last week';

  series: ApexAxisChartSeries = [
    {
      name: 'Inflow',
      data: [20, 25, 30, 28, 22, 18, 35],
    },
    {
      name: 'Outflow',
      data: [15, 18, 22, 20, 19, 17, 25],
    },
  ];

  chartOptions: ApexChart = {
    type: 'area',
    height: 120,
    sparkline: {
      enabled: true,
    },
  };

  stroke: ApexStroke = {
    curve: 'smooth',
    width: 2,
  };

  tooltip: ApexTooltip = {
    enabled: false,
  };

  xaxis: ApexXAxis = {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  };

  colors = ['#28a745', '#dc3545'];
}
