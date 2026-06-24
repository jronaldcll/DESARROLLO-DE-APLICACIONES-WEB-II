import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-reviews',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgScrollbar,
  ],
  templateUrl: './patient-reviews.component.html',
  styleUrl: './patient-reviews.component.scss',
})
export class PatientReviewsComponent {
  reviews = [
    {
      name: 'Alice Johnson',
      text: 'Great care from the nursing staff. Very attentive.',
      rating: 5,
    },
    {
      name: 'Bob Wilson',
      text: 'Clean facilities and professional doctors.',
      rating: 4,
    },
    {
      name: 'Carol Smith',
      text: 'The appointment process was smooth and the staff was helpful.',
      rating: 5,
    },
    {
      name: 'David Lee',
      text: 'Doctors were knowledgeable and explained everything clearly.',
      rating: 4,
    },
  ];

  getStars(rating: number) {
    return Array(rating).fill(0);
  }
}
