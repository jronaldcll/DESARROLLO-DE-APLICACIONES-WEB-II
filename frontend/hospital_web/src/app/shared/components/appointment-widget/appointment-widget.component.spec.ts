import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentWidgetComponent } from './appointment-widget.component';

describe('AppointmentWidgetComponent', () => {
  let component: AppointmentWidgetComponent;
  let fixture: ComponentFixture<AppointmentWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
