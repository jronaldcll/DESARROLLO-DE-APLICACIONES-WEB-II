import { Component, OnInit, inject, ChangeDetectionStrategy, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AiService } from '@core/service/ai.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-smart-insights',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule, NgScrollbar],
  templateUrl: './smart-insights.component.html',
  styleUrls: ['./smart-insights.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(15px)' }),
          stagger('120ms', animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ]
})
export class SmartInsightsComponent implements OnInit {
  private aiService = inject(AiService);
  insights = signal<string[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    this.generateInsights();
  }

  generateInsights() {
    this.isLoading.set(true);
    
    const prompt = `You are a Hospital Management AI. Based on the current dashboard (150 Patients Today, 85% Bed Occupancy, 12 Emergency cases), 
    provide 3 short, professional, and actionable predictive insights for the clinic administrator. 
    Each insight should be one sentence and start with a specific observation. Do not use numbering or symbols like * at start.`;

    this.aiService.postPrompt(prompt).subscribe({
      next: (response: string) => {
        let processedInsights = response.split('\n')
          .filter((line: string) => line.trim().length > 0)
          .slice(0, 3)
          .map((line: string) => line.replace(/^[0-9.-]+\s*/, '').trim());
        
        if (processedInsights.length === 1 && processedInsights[0].includes('.')) {
             processedInsights = response.split(/(?<=[.!?])\s+/).slice(0, 3);
        }
        this.insights.set(processedInsights);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        // Fallback demo insights
        this.insights.set([
          "Patient volume is expected to increase by 20% over the next 48 hours due to seasonal patterns.",
          "Bed occupancy reached 85%, suggesting a need to prioritize discharge processing for stable patients.",
          "Emergency department response times are currently optimal, but peak load is predicted for 6 PM."
        ]);
      }
    });
  }
}
