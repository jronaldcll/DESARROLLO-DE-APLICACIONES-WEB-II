import { CommonModule } from '@angular/common';
import { Component, input , ChangeDetectionStrategy} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

export interface Medicine {
  name: string;
  icon: string;
  dosage: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-medicine-list',
    imports: [MatCardModule, MatTableModule, CommonModule],
    templateUrl: './medicine-list.component.html',
    styleUrl: './medicine-list.component.scss'
})
export class MedicineListComponent {
  readonly medicineDataSource = input<Medicine[]>([]);
  displayedColumns: string[] = ['medicine', 'dosage'];
}
