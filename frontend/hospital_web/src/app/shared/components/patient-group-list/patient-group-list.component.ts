import { NgClass } from '@angular/common';
import { Component, input , ChangeDetectionStrategy} from '@angular/core';

interface PatientGroup {
  label: string;
  title: string;
  patientCount: number;
  colorClass: string;
}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-patient-group-list',
    imports: [NgClass],
    templateUrl: './patient-group-list.component.html',
    styleUrl: './patient-group-list.component.scss'
})
export class PatientGroupListComponent {
  readonly patientGroups = input<PatientGroup[]>([]);
}
