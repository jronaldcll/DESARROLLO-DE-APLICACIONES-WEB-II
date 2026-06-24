
import { Component, OnInit, OnChanges, input , ChangeDetectionStrategy} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexLegend,
  NgApexchartsModule,
} from 'ng-apexcharts';

export interface FeedbackData {
  score: number;
  series: number[];
  labels: string[];
  colors?: string[];
}

export type RadialChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.scss'],
  imports: [MatCardModule, MatIconModule, NgApexchartsModule],
})
export class FeedbackWidgetComponent implements OnInit, OnChanges {
  readonly feedbackData = input.required<FeedbackData>();
  readonly title = input<string>('Patient Satisfaction');
  readonly scoreLabel = input<string>('Average Feedback Score');

  public satisfactionChartOptions!: Partial<RadialChartOptions>;

  ngOnInit() {
    this.initSatisfactionChart();
  }

  ngOnChanges() {
    if (this.feedbackData()) {
      this.initSatisfactionChart();
    }
  }

  private initSatisfactionChart() {
    const feedbackData = this.feedbackData();
    if (!feedbackData) return;

    this.satisfactionChartOptions = {
      series: feedbackData.series,
      chart: {
        height: 240,
        type: 'donut',
      },
      labels: feedbackData.labels,
      colors: feedbackData.colors || ['#4CAF50', '#FFC107', '#F44336'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
          },
        },
      },
      legend: {
        show: true,
        position: 'bottom',
      },
    };
  }

  get fullStars(): number[] {
    return Array(Math.floor(this.feedbackData()?.score || 0)).fill(0);
  }

  get hasHalfStar(): boolean {
    return (this.feedbackData()?.score || 0) % 1 !== 0;
  }

  get emptyStars(): number[] {
    const totalStars = 5;
    const filledStars = Math.ceil(this.feedbackData()?.score || 0);
    return Array(Math.max(0, totalStars - filledStars)).fill(0);
  }
}
