import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule, ApexChart, ApexAxisChartSeries, ApexXAxis, ApexStroke, ApexMarkers, ApexYAxis, ApexTooltip } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-db2-patient-growth-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgApexchartsModule],
  templateUrl: './db2-patient-growth-chart.component.html',
  styleUrl: './db2-patient-growth-chart.component.scss'
})
export class Db2PatientGrowthChartComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        { name: 'New Patients', data: [31, 40, 28, 51, 42, 109, 100] },
        { name: 'Returning Patients', data: [11, 32, 45, 32, 34, 52, 41] }
      ],
      chart: { height: 350, type: 'line', toolbar: { show: false } },
      stroke: { width: [3, 3], curve: 'smooth' },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
      markers: { size: 4 },
      tooltip: { theme: 'dark' },
      colors: ['#4caf50', '#2196f3']
    };
  }

  ngOnInit(): void {}
}
