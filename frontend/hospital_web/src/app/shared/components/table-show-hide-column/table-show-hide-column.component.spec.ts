import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableShowHideColumnComponent } from './table-show-hide-column.component';

describe('TableShowHideColumnComponent', () => {
  let component: TableShowHideColumnComponent;
  let fixture: ComponentFixture<TableShowHideColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableShowHideColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableShowHideColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
