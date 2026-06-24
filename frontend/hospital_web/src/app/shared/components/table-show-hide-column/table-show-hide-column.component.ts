import { Component, input , ChangeDetectionStrategy} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ColumnDefinition } from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table-show-hide-column',
  imports: [
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDivider,
    MatButtonModule,
  ],
  templateUrl: './table-show-hide-column.component.html',
  styleUrl: './table-show-hide-column.component.scss',
})
export class TableShowHideColumnComponent {
  readonly columnDefinitions = input<ColumnDefinition[]>([]);

  trackBy(index: number, item: ColumnDefinition) {
    return item.def;
  }
}
