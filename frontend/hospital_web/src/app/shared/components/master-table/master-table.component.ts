import { Component, OnInit, AfterViewInit, inject, input, output, viewChild , ChangeDetectionStrategy} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { rowsAnimation, TableExportUtil } from '@shared';
import { formatDate, DatePipe, CommonModule, NgClass } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { TableShowHideColumnComponent } from '@shared/components/table-show-hide-column/table-show-hide-column.component';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

export interface ColumnDefinition {
  def: string;
  label: string;
  type:
    | 'text'
    | 'date'
    | 'time'
    | 'phone'
    | 'email'
    | 'address'
    | 'check'
    | 'actionBtn'
    | 'status'
    | 'nameWithImage'
    | 'team'
    | 'progress'
    | 'custom'
    | 'file';
  visible: boolean;
  sortable?: boolean;
  tooltip?: boolean;
  tooltipField?: string; // Specify which field to use for tooltip
  statusBadgeMap?: { [key: string]: string }; // For status column: maps status value to badge class
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-master-table',
  templateUrl: './master-table.component.html',
  styleUrls: ['./master-table.component.scss'],
  animations: [rowsAnimation],
  imports: [
    FeatherIconsComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatOptionModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatPaginatorModule,
    DatePipe,
    TableShowHideColumnComponent,
    SkeletonLoaderComponent,
  ],
  standalone: true,
})
export class MasterTableComponent<T = Record<string, unknown>> implements OnInit, AfterViewInit {
  private snackBar = inject(MatSnackBar);

  // Inputs
  readonly title = input<string>('Table');
  readonly columnDefinitions = input<ColumnDefinition[]>([]);
  readonly dataSource = input.required<MatTableDataSource<T>>();
  readonly isLoading = input<boolean>(false);
  readonly showCheckbox = input<boolean>(true);
  readonly showAdd = input<boolean>(true);
  readonly showEdit = input<boolean>(true);
  readonly showDelete = input<boolean>(true);
  readonly showDetails = input<boolean>(false);
  readonly showRefresh = input<boolean>(true);
  readonly showExport = input<boolean>(true);
  readonly showContextMenu = input<boolean>(true);
  readonly showBulkDelete = input<boolean>(true);
  readonly exportFileName = input<string>('export');
  readonly enableRowClick = input<boolean>(true);
  readonly disableRowClickToEdit = input<boolean>(false);
  readonly pageSize = input<number>(10);
  readonly pageSizeOptions = input<number[]>([5, 10, 25, 100]);

  // Outputs
  readonly add = output<void>();
  readonly edit = output<T>();
  readonly delete = output<T>();
  readonly details = output<T>();
  readonly refresh = output<void>();
  readonly bulkDelete = output<T[]>();
  readonly rowClick = output<T>();

  // Component properties
  selection = new SelectionModel<T>(true, []);
  contextMenuPosition = { x: '0px', y: '0px' };

  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  readonly contextMenu = viewChild(MatMenuTrigger);

  ngOnInit() {
    // Initialize table
    if (this.dataSource()) {
      setTimeout(() => {
        this.refreshTable();
      });
    }
  }

  ngAfterViewInit() {
    const dataSource = this.dataSource();
    if (dataSource) {
      dataSource.paginator = this.paginator();
      dataSource.sort = this.sort();
    }
  }

  getDisplayedColumns(): string[] {
    return this.columnDefinitions()
      .filter((cd) => cd.visible)
      .map((cd) => cd.def);
  }

  private refreshTable() {
    const dataSource = this.dataSource();
    const paginator = this.paginator();
    if (paginator) {
      paginator.pageIndex = 0;
      dataSource.paginator = paginator;
    }
    const sort = this.sort();
    if (sort) {
      dataSource.sort = sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource().filter = filterValue;
  }

  onAdd() {
    // TODO: The 'emit' function requires a mandatory void argument
    this.add.emit();
  }

  onEdit(row: T) {
    this.edit.emit(row);
  }

  onDelete(row: T) {
    this.delete.emit(row);
  }

  onDetails(row: T) {
    this.details.emit(row);
  }

  onRefresh() {
    // TODO: The 'emit' function requires a mandatory void argument
    this.refresh.emit();
  }

  onRowClick(row: T) {
    if (this.enableRowClick()) {
      this.rowClick.emit(row);
      // Also emit edit event for backward compatibility, unless disabled
      if (!this.disableRowClickToEdit()) {
        this.edit.emit(row);
      }
    }
  }

  async exportExcel() {
    const visibleColumns = this.columnDefinitions().filter(
      (col) => col.visible && col.type !== 'check' && col.type !== 'actionBtn'
    );

    const exportData = this.dataSource().filteredData.map((row: T) => {
      const exportRow: { [key: string]: string | number } = {};
      visibleColumns.forEach((col) => {
        let value: unknown = (row as Record<string, unknown>)[col.def];

        // Format dates
        if (col.type === 'date' && value) {
          value = formatDate(new Date(value as string | number | Date), 'yyyy-MM-dd', 'en');
        }

        // Ensure value is string or number to match TableElement interface
        exportRow[col.label] = value != null ? String(value) : '';
      });
      return exportRow;
    });

    await TableExportUtil.exportToExcel(exportData, this.exportFileName());
  }

  isAllSelected() {
    return this.selection.selected.length === this.dataSource().data.length;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource().data.forEach((row) => this.selection.select(row));
    }
  }

  removeSelectedRows() {
    const selectedRows = this.selection.selected;
    this.bulkDelete.emit(selectedRows);
    this.selection.clear();
  }

  onContextMenu(event: MouseEvent, item: T) {
    if (!this.showContextMenu()) return;

    event.preventDefault();

    // Calculate position relative to the containing card to handle glassmorphism offset issues
    // backdrop-filter on .card creates a new containing block for fixed/absolute elements
    const cardElement = (event.currentTarget as HTMLElement).closest('.card');
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      this.contextMenuPosition = {
        x: `${event.clientX - rect.left}px`,
        y: `${event.clientY - rect.top}px`,
      };
    } else {
      this.contextMenuPosition = {
        x: `${event.clientX}px`,
        y: `${event.clientY}px`,
      };
    }
    const contextMenu = this.contextMenu();
    if (contextMenu) {
      contextMenu.menuData = { item };
      contextMenu.menu?.focusFirstItem('mouse');
      contextMenu.openMenu();
    }
  }

  // Helper method to get status badge class with case-insensitive matching
  getStatusBadgeClass(
    statusValue: string,
    statusBadgeMap?: { [key: string]: string }
  ): string | null {
    if (!statusBadgeMap || !statusValue) {
      return null;
    }

    // Try exact match first
    if (statusBadgeMap[statusValue]) {
      return statusBadgeMap[statusValue];
    }

    // Try case-insensitive match
    const lowerStatusValue = statusValue.toLowerCase();
    const matchingKey = Object.keys(statusBadgeMap).find(
      (key) => key.toLowerCase() === lowerStatusValue
    );

    return matchingKey ? statusBadgeMap[matchingKey] : null;
  }

  downloadFile(fileUrl: string, columnName: string) {
    // Show notification
    this.snackBar.open(`${columnName} downloaded successfully!`, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    // In a real application, you would implement the actual file download logic here
    // For example:
    // window.open(fileUrl, '_blank');
    // Or use a more sophisticated download approach
  }
}
