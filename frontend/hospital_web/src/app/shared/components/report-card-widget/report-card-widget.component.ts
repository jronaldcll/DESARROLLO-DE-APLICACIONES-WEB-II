import { Component, input , ChangeDetectionStrategy} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-report-card-widget',
    imports: [],
    templateUrl: './report-card-widget.component.html',
    styleUrl: './report-card-widget.component.scss'
})
export class ReportCardWidgetComponent {
  readonly todayCount = input<number>(0);
  readonly weekCount = input<number>(0);
  readonly monthCount = input<number>(0);
  readonly progressPercentage = input<number>(0);
  readonly progressColor = input<string>('orange');
  readonly heading = input<string>('Patient Report');
}
