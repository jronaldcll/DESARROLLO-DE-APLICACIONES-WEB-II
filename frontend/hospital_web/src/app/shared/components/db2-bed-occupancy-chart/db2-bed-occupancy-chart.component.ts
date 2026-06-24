import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule, ApexChart, ApexAxisChartSeries, ApexXAxis, ApexPlotOptions, ApexLegend, ApexGrid, ApexTooltip } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-db2-bed-occupancy-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgApexchartsModule],
  templateUrl: './db2-bed-occupancy-chart.component.html',
  styleUrl: './db2-bed-occupancy-chart.component.scss'
})
export class Db2BedOccupancyChartComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        { name: 'Pending Admissions', data: [44, 55, 41, 67, 22, 43] },
        { name: 'Completed Cases', data: [13, 23, 20, 8, 13, 27] }
      ],
      chart: { type: 'bar', height: 350, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: false, columnWidth: '55%', borderRadius: 5 } },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
      legend: { position: 'top', horizontalAlign: 'right' },
      grid: { borderColor: '#f1f1f1' },
      tooltip: { theme: 'dark' },
      colors: ['#2196f3', '#e0e0e0']
    };
  }

  ngOnInit(): void {}
}
