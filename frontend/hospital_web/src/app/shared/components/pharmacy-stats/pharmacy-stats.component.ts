import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { NgApexchartsModule, ApexChart, ApexAxisChartSeries, ApexXAxis, ApexPlotOptions, ApexDataLabels, ApexYAxis, ApexTooltip } from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pharmacy-stats',
  standalone: true,
  imports: [NgApexchartsModule, MatCardModule],
  templateUrl: './pharmacy-stats.component.html',
  styleUrl: './pharmacy-stats.component.scss'
})
export class PharmacyStatsComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Orders',
          data: [120, 150, 180, 200, 140, 100, 130]
        }
      ],
      chart: {
        type: 'bar',
        height: 250,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      tooltip: {
        theme: 'dark'
      },
      colors: ['#673AB7']
    };
  }

  ngOnInit(): void {}
}
