import { CommonModule } from '@angular/common';
import { Component, input , ChangeDetectionStrategy} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Event {
  day: string;
  date: number;
  month: string;
  title: string;
  timeStart: string;
  timeEnd: string;
  status?: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-event-card',
    imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
    templateUrl: './event-card.component.html',
    styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  readonly events = input<Event[]>([]);
  readonly maxEvents = input<number>(3);
  readonly showViewMore = input<boolean>(true);
}
