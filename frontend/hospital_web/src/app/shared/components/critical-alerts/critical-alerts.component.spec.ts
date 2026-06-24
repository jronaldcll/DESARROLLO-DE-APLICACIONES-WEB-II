import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalAlertsComponent } from './critical-alerts.component';

describe('CriticalAlertsComponent', () => {
  let component: CriticalAlertsComponent;
  let fixture: ComponentFixture<CriticalAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriticalAlertsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriticalAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
