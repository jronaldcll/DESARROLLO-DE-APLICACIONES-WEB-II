import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NurseDashboardComponent } from './nurse-dashboard.component';

describe('NurseDashboardComponent', () => {
  let component: NurseDashboardComponent;
  let fixture: ComponentFixture<NurseDashboardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NurseDashboardComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});