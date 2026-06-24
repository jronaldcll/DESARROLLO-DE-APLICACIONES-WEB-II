# Master Table Component - Usage Guide

## Overview

The `master-table` component is a powerful, reusable table component that consolidates all common CRUD table functionality. It reduces table implementation from ~300 lines to ~20 lines while maintaining full customization capabilities.

## Basic Usage

### 1. Import the Component

```typescript
import { MasterTableComponent } from '@shared/components/master-table/master-table.component';

@Component({
  // ...
  imports: [
    MasterTableComponent,
    // ... other imports
  ],
})
```

### 2. Define Column Definitions

```typescript
columnDefinitions = [
  { def: 'select', label: 'Checkbox', type: 'check', visible: true },
  { def: 'name', label: 'Name', type: 'text', visible: true },
  { def: 'email', label: 'Email', type: 'email', visible: true },
  { def: 'mobile', label: 'Mobile', type: 'phone', visible: true },
  { def: 'date', label: 'Date', type: 'date', visible: true },
  { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
];
```

### 3. Initialize Data Source

```typescript
dataSource = new MatTableDataSource<YourModel>([]);
isLoading = true;
```

### 4. Use in Template

```html
<app-master-table
  [title]="'Your Table Title'"
  [columnDefinitions]="columnDefinitions"
  [dataSource]="dataSource"
  [isLoading]="isLoading"
  [exportFileName]="'your-export-file'"
  (add)="handleAdd()"
  (edit)="handleEdit($event)"
  (delete)="handleDelete($event)"
  (refresh)="handleRefresh()"
  (bulkDelete)="handleBulkDelete($event)">
</app-master-table>
```

## Complete Example: Refactoring Viewappointment Component

### Before (343 lines in TS + 284 lines in HTML = 627 lines)

**viewappointment.component.ts** - 343 lines with all table logic

**viewappointment.component.html** - 284 lines of table markup

### After (~150 lines in TS + ~30 lines in HTML = 180 lines)

**viewappointment.component.ts**

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ViewAppointmentFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { ViewAppointmentDeleteComponent } from './dialogs/delete/delete.component';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.model';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent } from '@shared/components/master-table/master-table.component';
import { LocalStorageService } from '@shared/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-viewappointment',
  templateUrl: './viewappointment.component.html',
  styleUrls: ['./viewappointment.component.scss'],
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class ViewappointmentComponent implements OnInit, OnDestroy {
  columnDefinitions = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'name', label: 'Name', type: 'text', visible: true },
    { def: 'doctor', label: 'Doctor', type: 'text', visible: true },
    { def: 'gender', label: 'Gender', type: 'text', visible: true },
    { def: 'date', label: 'Date', type: 'date', visible: true },
    { def: 'startTime', label: 'Time', type: 'time', visible: true },
    { def: 'mobile', label: 'Mobile', type: 'phone', visible: true },
    { def: 'email', label: 'Email', type: 'email', visible: true },
    { def: 'appointmentStatus', label: 'Appointment Status', type: 'text', visible: true },
    { def: 'visitType', label: 'Visit Type', type: 'text', visible: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Appointment>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();
  eventDetails: any = null;

  constructor(
    public dialog: MatDialog,
    public appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.eventDetails = params;
    });
    this.loadData(this.eventDetails.start);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(filterDate?: string) {
    this.isLoading = true;
    this.appointmentService.getAllAppointments().subscribe({
      next: (data) => {
        if (filterDate) {
          const filteredData = data.filter((appointment) => {
            const appointmentDate = formatDate(new Date(appointment.date), 'yyyy-MM-dd', 'en');
            const selectedDate = formatDate(new Date(filterDate), 'yyyy-MM-dd', 'en');
            return appointmentDate === selectedDate;
          });
          this.dataSource.data = filteredData;
        } else {
          this.dataSource.data = data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  handleAdd() {
    this.openDialog('add');
  }

  handleEdit(row: Appointment) {
    this.openDialog('edit', row);
  }

  handleDelete(row: Appointment) {
    const dialogRef = this.dialog.open(ViewAppointmentDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.id !== row.id
        );
        this.showNotification('snackbar-danger', 'Delete Record Successfully...!!!');
      }
    });
  }

  handleRefresh() {
    this.loadData();
  }

  handleBulkDelete(selectedRows: Appointment[]) {
    this.dataSource.data = this.dataSource.data.filter(
      (item) => !selectedRows.includes(item)
    );
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`
    );
  }

  openDialog(action: 'add' | 'edit', data?: Appointment) {
    const varDirection = this.localStorageService.get('isRtl') === 'true' ? 'rtl' : 'ltr';
    const dialogRef = this.dialog.open(ViewAppointmentFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { appointment: data, action },
      direction: varDirection,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex((record) => record.id === result.id);
          if (index !== -1) {
            this.dataSource.data[index] = result;
            this.dataSource._updateChangeSubscription();
          }
        }
        this.showNotification(
          action === 'add' ? 'snackbar-success' : 'black',
          `${action === 'add' ? 'Add' : 'Edit'} Record Successfully...!!!`
        );
      }
    });
  }

  showNotification(colorName: string, text: string) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: colorName,
    });
  }
}
```

**viewappointment.component.html**

```html
<section class="content">
  <div class="content-block">
    <div class="block-header">
      <app-breadcrumb 
        [title]="'View Appointment'" 
        [items]="['Appointment']" 
        [active_item]="'View'">
      </app-breadcrumb>
    </div>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <app-master-table
          [title]="'Appointment'"
          [columnDefinitions]="columnDefinitions"
          [dataSource]="dataSource"
          [isLoading]="isLoading"
          [exportFileName]="'appointments'"
          (add)="handleAdd()"
          (edit)="handleEdit($event)"
          (delete)="handleDelete($event)"
          (refresh)="handleRefresh()"
          (bulkDelete)="handleBulkDelete($event)">
        </app-master-table>
      </div>
    </div>
  </div>
</section>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | `'Table'` | Table title displayed in header |
| `columnDefinitions` | `ColumnDefinition[]` | `[]` | Column configuration array |
| `dataSource` | `MatTableDataSource<any>` | required | Material table data source |
| `isLoading` | `boolean` | `false` | Show loading spinner |
| `showCheckbox` | `boolean` | `true` | Show selection checkboxes |
| `showAdd` | `boolean` | `true` | Show add button |
| `showEdit` | `boolean` | `true` | Show edit button |
| `showDelete` | `boolean` | `true` | Show delete button |
| `showRefresh` | `boolean` | `true` | Show refresh button |
| `showExport` | `boolean` | `true` | Show export button |
| `showContextMenu` | `boolean` | `true` | Show context menu |
| `showBulkDelete` | `boolean` | `true` | Show bulk delete button |
| `exportFileName` | `string` | `'export'` | Excel export filename |
| `enableRowClick` | `boolean` | `true` | Enable row click to edit |
| `pageSize` | `number` | `10` | Default page size |
| `pageSizeOptions` | `number[]` | `[5, 10, 25, 100]` | Page size options |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `add` | `EventEmitter<void>` | Emitted when add button clicked |
| `edit` | `EventEmitter<any>` | Emitted when edit button clicked or row clicked |
| `delete` | `EventEmitter<any>` | Emitted when delete button clicked |
| `refresh` | `EventEmitter<void>` | Emitted when refresh button clicked |
| `bulkDelete` | `EventEmitter<any[]>` | Emitted when bulk delete triggered |
| `rowClick` | `EventEmitter<any>` | Emitted when row is clicked |

### Column Definition Interface

```typescript
interface ColumnDefinition {
  def: string;           // Column property name
  label: string;         // Column header label
  type: 'text' | 'date' | 'time' | 'phone' | 'email' | 'address' | 'check' | 'actionBtn' | 'status' | 'nameWithImage' | 'custom';
  visible: boolean;      // Show/hide column
  sortable?: boolean;    // Enable sorting (default: true)
  tooltip?: boolean;     // Show tooltip on hover
  statusBadgeMap?: { [key: string]: string }; // For status column: maps status value to badge class
}
```

### Column Types

- **text**: Plain text column
- **date**: Formatted date column (MM/dd/yyyy)
- **time**: Time column with clock icon
- **phone**: Phone number with phone icon
- **email**: Email with mail icon
- **address**: Address with location icon
- **status**: Status column with colored badges (requires `statusBadgeMap`)
- **nameWithImage**: Name column with optional avatar image (checks for `row.img`)
- **check**: Checkbox column (for selection)
- **actionBtn**: Actions column (edit/delete buttons)
- **custom**: Custom template (future enhancement)

### Special Features

#### Status Badges

Use the `status` type with `statusBadgeMap` to display colored badges for different status values:

```typescript
columnDefinitions = [
  {
    def: 'status',
    label: 'Status',
    type: 'status',
    visible: true,
    statusBadgeMap: {
      'Available': 'badge badge-solid-green',
      'Discharged': 'badge badge-solid-orange',
      'Reserved': 'badge badge-solid-purple',
      'Maintenance': 'badge badge-solid-red'
    }
  }
];
```

#### Name Column with Avatar

Use the `nameWithImage` type to display an avatar image with the name. The component will automatically check if `row.img` exists:

```typescript
columnDefinitions = [
  { def: 'patientName', label: 'Patient Name', type: 'nameWithImage', visible: true }
];

// Data with image
{ patientName: 'John Doe', img: '/assets/images/user.jpg', ... }

// Data without image (shows name only)
{ patientName: 'Jane Smith', img: null, ... }
```

#### Gender Badges

The `gender` column automatically displays colored badges:
- **male**: Green badge
- **female**: Purple badge

## Customization Examples

### Hide Specific Buttons

```html
<app-master-table
  [showAdd]="false"
  [showExport]="false"
  [showContextMenu]="false"
  ...>
</app-master-table>
```

### Disable Row Click

```html
<app-master-table
  [enableRowClick]="false"
  ...>
</app-master-table>
```

### Custom Page Size

```html
<app-master-table
  [pageSize]="25"
  [pageSizeOptions]="[10, 25, 50, 100]"
  ...>
</app-master-table>
```

## Benefits

✅ **Code Reduction**: 70% less code per table page  
✅ **Consistency**: Uniform UX across all tables  
✅ **Maintainability**: Fix bugs once, benefit everywhere  
✅ **Faster Development**: New CRUD pages in minutes  
✅ **Fully Customizable**: Toggle any feature via inputs  
✅ **Type Safe**: Full TypeScript support  

## Migration Checklist

When migrating an existing table component:

1. ✅ Import `MasterTableComponent`
2. ✅ Keep your `columnDefinitions` array
3. ✅ Keep your `dataSource` initialization
4. ✅ Create handler methods for CRUD operations
5. ✅ Replace table HTML with `<app-master-table>`
6. ✅ Remove unused imports (MatPaginator, MatSort, SelectionModel, etc.)
7. ✅ Test all functionality
