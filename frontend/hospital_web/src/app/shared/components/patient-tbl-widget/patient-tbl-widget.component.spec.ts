import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTblWidgetComponent } from './patient-tbl-widget.component';

describe('PatientTblWidgetComponent', () => {
  let component: PatientTblWidgetComponent;
  let fixture: ComponentFixture<PatientTblWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientTblWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientTblWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
