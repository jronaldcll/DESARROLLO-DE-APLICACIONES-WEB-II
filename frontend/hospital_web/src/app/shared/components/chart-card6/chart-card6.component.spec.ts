import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCard6Component } from './chart-card6.component';

describe('ChartCard6Component', () => {
  let component: ChartCard6Component;
  let fixture: ComponentFixture<ChartCard6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartCard6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartCard6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
