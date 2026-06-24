
import { Component, input , ChangeDetectionStrategy} from '@angular/core';

interface Activity {
  timestamp: string;
  message: string;
  statusClass: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-recent-activity',
    imports: [],
    templateUrl: './recent-activity.component.html',
    styleUrl: './recent-activity.component.scss'
})
export class RecentActivityComponent {
  readonly activities = input<Activity[]>([]);
}
