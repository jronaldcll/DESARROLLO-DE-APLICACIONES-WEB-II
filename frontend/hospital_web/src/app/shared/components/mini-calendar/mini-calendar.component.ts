import { AfterViewInit, Component, ChangeDetectorRef, ViewEncapsulation, AfterViewChecked, inject, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.scss'],
  imports: [MatDatepickerModule, MatCardModule],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class MiniCalendarComponent implements AfterViewInit, AfterViewChecked {
  private cdr = inject(ChangeDetectorRef);

  readonly calendar = viewChild.required(MatCalendar);
  selectedDate: Date | null = null;

  // Event data - using current date format
  eventMap = new Map<string, { type: string; label: string }[]>();

  constructor() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const eventTypes = [
      { type: 'surgery', label: 'Surgery' },
      { type: 'polyclinic', label: 'Polyclinic Visit' },
      { type: 'evaluation', label: 'Evaluation' },
      { type: 'follow_up', label: 'Follow-Up Appointment' },
      { type: 'ward_round', label: 'Ward Round' },
      { type: 'consultation', label: 'Consultation' },
    ];

    const usedDays = new Set<number>();

    // Generate 10 unique random days for this month
    while (usedDays.size < 10) {
      const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
      usedDays.add(randomDay);
    }

    Array.from(usedDays).forEach((day) => {
      const dateKey = this.formatDate(new Date(currentYear, currentMonth, day));
      const numberOfEvents = Math.floor(Math.random() * 2) + 1; // 1 or 2 events

      const events = Array.from({ length: numberOfEvents }).map(() => {
        const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        return {
          type: event.type,
          label: `${event.label}`,
        };
      });

      this.eventMap.set(dateKey, events);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.injectDots();

      const calendar = this.calendar();
      if (calendar) {
        calendar.monthSelected.subscribe(() => {
          setTimeout(() => this.injectDots(), 100);
        });
        calendar.yearSelected.subscribe(() => {
          setTimeout(() => this.injectDots(), 100);
        });
        calendar.stateChanges.subscribe(() => {
          setTimeout(() => this.injectDots(), 50);
        });
      }
    }, 200);
  }

  ngAfterViewChecked(): void {
    const existingDots = document.querySelectorAll('.dot-container');
    if (existingDots.length === 0) {
      this.injectDots();
    }
  }

  injectDots() {
    // Remove existing dots first
    const existingDots = document.querySelectorAll('.dot-container');
    existingDots.forEach((dot) => dot.remove());

    const cells = document.querySelectorAll(
      '.mat-calendar-body-cell:not(.mat-calendar-body-disabled)'
    ) as NodeListOf<HTMLElement>;

    cells.forEach((cell: HTMLElement) => {
      cell.style.position = 'relative';
      cell.style.overflow = 'visible';

      const cellContent = cell.querySelector(
        '.mat-calendar-body-cell-content'
      ) as HTMLElement;
      if (!cellContent) return;

      const day = cellContent.textContent?.trim();
      if (!day) return;

      const currentViewDate = this.calendar()?.activeDate || new Date();
      const year = currentViewDate.getFullYear();
      const month = (currentViewDate.getMonth() + 1)
        .toString()
        .padStart(2, '0');
      const dayPadded = day.padStart(2, '0');
      const key = `${year}-${month}-${dayPadded}`;

      const events = this.eventMap.get(key);
      if (!events || events.length === 0) return;

      cell.classList.add('has-events');
      if (events.length > 1) {
        cell.classList.add('has-multiple-events');
      }

      const dotContainer = document.createElement('div') as HTMLElement;
      dotContainer.classList.add('dot-container');
      dotContainer.style.cssText = `
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      height: 6px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 2px;
      z-index: 10;
      pointer-events: auto;
      min-width: 20px;
    `;

      events.forEach((event) => {
        const span = document.createElement('span') as HTMLElement;
        span.classList.add('dot', `dot-${event.type}`);
        span.style.cssText = `
        width: 6px;
        height: 6px;
        border-radius: 50%;
        display: block;
        cursor: pointer;
        flex-shrink: 0;
        margin: 0;
        position: relative;
        pointer-events: auto;
      `;

        // Set background color
        switch (event.type) {
          case 'surgery':
            span.style.backgroundColor = '#4a6cf7';
            break;
          case 'polyclinic':
            span.style.backgroundColor = '#e74c3c';
            break;
          case 'evaluation':
            span.style.backgroundColor = '#27ae60';
            break;
          case 'follow_up':
            span.style.backgroundColor = '#d40ee6ff';
            break;
          case 'ward_round':
            span.style.backgroundColor = '#d8f423ff';
            break;
          case 'consultation':
            span.style.backgroundColor = '#9e007eff';
            break;
          default:
            span.style.backgroundColor = '#cccccc';
        }

        // Create custom tooltip
        const tooltip = document.createElement('div') as HTMLElement;
        tooltip.textContent = event.label;
        tooltip.classList.add('custom-tooltip');

        span.appendChild(tooltip);

        // Tooltip hover events
        span.addEventListener('mouseenter', () => {
          tooltip.style.display = 'block';
          span.style.transform = 'scale(1.2)';
          span.style.transition = 'transform 0.1s ease';
        });

        span.addEventListener('mouseleave', () => {
          tooltip.style.display = 'none';
          span.style.transform = 'scale(1)';
        });

        // Click alert (unchanged)
        span.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          alert(`${event.label} on ${key} (Day ${day})`);
        });

        dotContainer.appendChild(span);
      });

      cell.appendChild(dotContainer);
    });
  }

  // Used for [dateClass] binding - this adds CSS classes to dates with events
  customDateClass = (d: Date): string => {
    const key = this.formatDate(d);
    const hasEvents = this.eventMap.has(key);
    return hasEvents ? 'has-events' : '';
  };

  formatDate(date: Date): string {
    // Use UTC to avoid timezone issues
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
