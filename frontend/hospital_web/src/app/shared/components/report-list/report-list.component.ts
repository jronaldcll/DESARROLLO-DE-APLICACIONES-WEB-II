import { NgClass } from '@angular/common';
import { Component, input , ChangeDetectionStrategy} from '@angular/core';

interface Report {
  title: string;
  icon: string; // FontAwesome class
  colorClass: string; // Color class for styling
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-report-list',
    imports: [NgClass],
    templateUrl: './report-list.component.html',
    styleUrl: './report-list.component.scss'
})
export class ReportListComponent {
  readonly reports = input<Report[]>([]);
}
