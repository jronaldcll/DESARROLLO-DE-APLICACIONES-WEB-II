import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lab-sample-tracking',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    NgScrollbar,
  ],
  templateUrl: './lab-sample-tracking.component.html',
  styleUrl: './lab-sample-tracking.component.scss',
})
export class LabSampleTrackingComponent {
  samples = [
    {
      id: 'LAB-2041',
      test: 'Complete Blood Count',
      patient: 'James Carter',
      step: 2,
    },
    {
      id: 'LAB-2045',
      test: 'Liver Function Test',
      patient: 'Emma Wilson',
      step: 1,
    },
    {
      id: 'LAB-2052',
      test: 'Lipid Profile',
      patient: 'Robert Brown',
      step: 0,
    },
    {
      id: 'LAB-2060',
      test: 'Blood Sugar (F)',
      patient: 'Maria Garcia',
      step: 2,
    },

  ];
}
