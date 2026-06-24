import { CommonModule } from '@angular/common';
import { Component, input , ChangeDetectionStrategy} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-schedule-card',
    imports: [CommonModule],
    templateUrl: './schedule-card.component.html',
    styleUrl: './schedule-card.component.scss'
})
export class ScheduleCardComponent {
  readonly schedules = input<Array<{
    title: string;
    dateRange: string;
    statusClass: string;
}>>([]);
}
