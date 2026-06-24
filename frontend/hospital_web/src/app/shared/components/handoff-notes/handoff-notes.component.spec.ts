import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandoffNotesComponent } from './handoff-notes.component';

describe('HandoffNotesComponent', () => {
  let component: HandoffNotesComponent;
  let fixture: ComponentFixture<HandoffNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandoffNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandoffNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
