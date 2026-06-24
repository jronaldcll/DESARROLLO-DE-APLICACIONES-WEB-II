import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-sentiment-meter',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './patient-sentiment-meter.component.html',
  styleUrl: './patient-sentiment-meter.component.scss'
})
export class PatientSentimentMeterComponent {
  sentiments = [
    { emoji: 'sentiment_very_satisfied', count: 45, label: 'Excellent', color: 'text-success' },
    { emoji: 'sentiment_satisfied', count: 28, label: 'Good', color: 'text-primary' },
    { emoji: 'sentiment_neutral', count: 12, label: 'Average', color: 'text-warning' },
    { emoji: 'sentiment_dissatisfied', count: 5, label: 'Poor', color: 'text-danger' }
  ];
}
