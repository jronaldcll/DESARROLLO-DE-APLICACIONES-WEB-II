import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-clinical-event-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './clinical-event-list.component.html',
  styleUrl: './clinical-event-list.component.scss'
})
export class ClinicalEventListComponent {
  events = [
    { title: 'Cardiology CME Seminar', date: 'Tomorrow, 10:00 AM', loc: 'Conference Hall A', type: 'Educational' },
    { title: 'Departmental Review Meeting', date: 'Fri, 15th May', loc: 'Room 402', type: 'Administrative' }
  ];
}
