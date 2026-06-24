import { Component, input , ChangeDetectionStrategy} from '@angular/core';

interface Schedule {
  name: string;
  degree: string;
  date: string;
  time: string;
  imageUrl: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-emp-schedule',
    imports: [],
    templateUrl: './emp-schedule.component.html',
    styleUrl: './emp-schedule.component.scss'
})
export class EmpScheduleComponent {
  readonly schedules = input<Schedule[]>([]);
}
