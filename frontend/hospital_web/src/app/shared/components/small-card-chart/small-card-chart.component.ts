import { Component, OnInit, input, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexOptions } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-small-card-chart',
  imports: [MatCardModule, NgApexchartsModule, MatIconModule],
  templateUrl: './small-card-chart.component.html',
  styleUrl: './small-card-chart.component.scss',
})
export class SmallCardChartComponent implements OnInit {
  // Input properties for dynamic content
  readonly title = input<string>('');
  readonly amount = input<string>('');
  readonly percentageChange = input<string>('');
  readonly profitData = input<number[]>([]);
  readonly chartCategories = input<string[]>([]);

  // Chart options
  smallChart5Options: ApexOptions = {};

  constructor() {}

  ngOnInit(): void {
    // Initialize the chart with dynamic data
    this.initChart();
  }

  // Function to initialize the chart with dynamic options
  private initChart() {
    this.smallChart5Options = {
      colors: ['#4b6dff'],
      series: [
        {
          name: 'Profit',
          data: this.profitData(), // Dynamic data for the chart
        },
      ],
      chart: {
        height: 90,
        type: 'bar',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
        foreColor: '#9aa0ac',
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: '50%',
        },
      },
      xaxis: {
        categories: this.chartCategories(), // Dynamic categories
        position: 'top',
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }
}
