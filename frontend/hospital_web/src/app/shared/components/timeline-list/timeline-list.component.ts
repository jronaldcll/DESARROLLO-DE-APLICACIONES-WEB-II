
import { Component, input , ChangeDetectionStrategy} from '@angular/core';

export interface TimelineItem {
  image: string;
  title: string;
  timeAgo: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-timeline-list',
    imports: [],
    templateUrl: './timeline-list.component.html',
    styleUrl: './timeline-list.component.scss'
})
export class TimelineListComponent {
  readonly timelineItems = input<TimelineItem[]>([]);
}
