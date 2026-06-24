import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, OnInit, input, viewChild , ChangeDetectionStrategy} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FeatherIconsComponent } from '../feather-icons/feather-icons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { rowsAnimation } from '@shared/table.animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface ColumnDefinition {
  def: string;
  label?: string;
  type?: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-table-card',
    animations: [rowsAnimation],
    imports: [
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatIconModule,
        CommonModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatButtonModule,
        FeatherIconsComponent,
    ],
    templateUrl: './table-card.component.html',
    styleUrl: './table-card.component.scss'
})
export class TableCardComponent<T> implements OnInit {
  readonly dataSource = input<T[]>([]);
  readonly columnDefinitions = input<ColumnDefinition[]>([]);
  selection = new SelectionModel<T>(true, []);
  dataSourceTable!: MatTableDataSource<T>;
  displayedColumns: string[] = []; // New property for displayed columns

  readonly sort = viewChild.required(MatSort);

  ngOnInit() {
    this.dataSourceTable = new MatTableDataSource(this.dataSource());
    this.setDisplayedColumns(); // Initialize displayed columns

    this.dataSourceTable.sort = this.sort(); // Assign the MatSort to the data source
  }

  setDisplayedColumns() {
    this.displayedColumns = [...this.columnDefinitions().map((col) => col.def)];
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceTable.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSourceTable.data.forEach((row) => this.selection.select(row));
    }
  }

  editCall(_row: T) {
    // Using _row parameter to satisfy linting
    // Logic for editing
  }

  deleteItem(_row: T) {
    // Using _row parameter to satisfy linting
    // Logic for deleting
  }

  onContextMenu(_event: MouseEvent, _row: T) {
    // Using parameters to satisfy linting
    // Context menu logic (if needed)
  }

  getProgressBarColor(value: number): string {
    if (value < 50) {
      return 'warn';
    } else if (value >= 50 && value <= 70) {
      return 'accent';
    } else {
      return 'primary';
    }
  }
}
