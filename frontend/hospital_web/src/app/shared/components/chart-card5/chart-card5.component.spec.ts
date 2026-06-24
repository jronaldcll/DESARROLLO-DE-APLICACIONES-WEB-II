import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCard5Component } from './chart-card5.component';

describe('ChartCard5Component', () => {
  let component: ChartCard5Component;
  let fixture: ComponentFixture<ChartCard5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartCard5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartCard5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
