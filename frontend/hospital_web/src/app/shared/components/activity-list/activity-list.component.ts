import { NgClass } from '@angular/common';
import { Component, input , ChangeDetectionStrategy} from '@angular/core';

interface Activity {
  userImage: string;
  userName: string;
  label: string;
  labelStyle: string;
  time: string;
  message: string;
  isActive: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-activity-list',
    imports: [NgClass],
    templateUrl: './activity-list.component.html',
    styleUrl: './activity-list.component.scss'
})
export class ActivityListComponent {
  readonly activities = input<Activity[]>([]);
}
