import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { NgApexchartsModule, ApexChart, ApexAxisChartSeries, ApexXAxis, ApexStroke, ApexTooltip, ApexDataLabels } from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-avg-wait-time',
  standalone: true,
  imports: [NgApexchartsModule, MatCardModule],
  templateUrl: './avg-wait-time.component.html',
  styleUrl: './avg-wait-time.component.scss'
})
export class AvgWaitTimeComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Wait Time',
          data: [31, 40, 28, 51, 42, 109, 100]
        }
      ],
      chart: {
        height: 250,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
      },
      tooltip: {
        theme: 'dark',
        x: {
          format: 'HH:mm'
        }
      },
      colors: ['#F44336']
    };
  }

  ngOnInit(): void {}
}
