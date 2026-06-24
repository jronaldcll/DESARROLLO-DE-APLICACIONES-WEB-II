import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InflowOutflowWidgetComponent } from './inflow-outflow-widget.component';

describe('InflowOutflowWidgetComponent', () => {
  let component: InflowOutflowWidgetComponent;
  let fixture: ComponentFixture<InflowOutflowWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InflowOutflowWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InflowOutflowWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
