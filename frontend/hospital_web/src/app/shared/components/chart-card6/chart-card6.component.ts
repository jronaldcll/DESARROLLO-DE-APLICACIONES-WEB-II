import { CommonModule } from '@angular/common';
import { Component, OnInit, input, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chart-card6',
  imports: [NgApexchartsModule, MatCardModule, CommonModule],
  templateUrl: './chart-card6.component.html',
  styleUrl: './chart-card6.component.scss',
})
export class ChartCard6Component implements OnInit {
  readonly cardTitle = input<string>('');
  readonly cardValue = input<number | string>('');
  readonly icon = input<string>(''); // material icon name, e.g. 'face'
  readonly iconBg = input<string>('#6F42C1'); // default purple
  readonly chartOptions = input<ApexOptions>({
    series: [],
    chart: { type: 'line', height: 350 },
    xaxis: { categories: [] },
    yaxis: [],
    colors: [],
    stroke: { curve: 'smooth' },
    legend: { show: false },
    tooltip: { enabled: true },
    dataLabels: { enabled: false }
}); // ApexChart config passed from parent

  cardBackgroundColor: string = '';

  ngOnInit() {
    this.cardBackgroundColor = this.hexToRgba(this.iconBg(), 0.15);
  }

  private hexToRgba(hex: string, alpha: number): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16); // Red
      const g = parseInt(result[2], 16); // Green
      const b = parseInt(result[3], 16); // Blue
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgba(111, 66, 193, ${alpha})`;
  }
}
