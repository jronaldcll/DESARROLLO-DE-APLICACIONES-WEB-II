import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  NgApexchartsModule,
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
} from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-staff-on-duty',
  standalone: true,
  imports: [NgApexchartsModule, MatCardModule],
  templateUrl: './staff-on-duty.component.html',
  styleUrl: './staff-on-duty.component.scss',
})
export class StaffOnDutyComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Morning',
          data: [44, 55, 41, 67, 22],
        },
        {
          name: 'Evening',
          data: [13, 23, 20, 8, 13],
        },
        {
          name: 'Night',
          data: [11, 17, 15, 15, 21],
        },
      ],
      chart: {
        type: 'bar',
        height: 250,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Doctors', 'Nurses', 'Techs', 'Admin', 'Other'],
      },
      legend: {
        position: 'bottom',
      },
      colors: ['#4CAF50', '#FF9800', '#2196F3'],
      tooltip: {
        theme: 'dark',
      },
    };
  }

  ngOnInit(): void {}
}
