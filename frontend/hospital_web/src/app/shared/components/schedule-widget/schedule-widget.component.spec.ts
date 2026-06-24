import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleWidgetComponent } from './schedule-widget.component';

describe('ScheduleWidgetComponent', () => {
  let component: ScheduleWidgetComponent;
  let fixture: ComponentFixture<ScheduleWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
