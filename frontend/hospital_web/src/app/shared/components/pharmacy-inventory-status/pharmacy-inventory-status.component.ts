import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pharmacy-inventory-status',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    NgScrollbar,
  ],
  templateUrl: './pharmacy-inventory-status.component.html',
  styleUrl: './pharmacy-inventory-status.component.scss',
})
export class PharmacyInventoryStatusComponent {
  stocks = [
    {
      name: 'Insulin - Glargine',
      stock: 12,
      unit: 'vials',
      status: 'Low Stock',
      color: 'warn',
    },
    {
      name: 'Amoxicillin 500mg',
      stock: 850,
      unit: 'tabs',
      status: 'In Stock',
      color: 'primary',
    },
    {
      name: 'Paracetamol IV',
      stock: 5,
      unit: 'bottles',
      status: 'Critical',
      color: 'warn',
    },
    {
      name: 'Disposable Syringes',
      stock: 2500,
      unit: 'pcs',
      status: 'In Stock',
      color: 'primary',
    },
    {
      name: 'Surgical Masks (N95)',
      stock: 150,
      unit: 'boxes',
      status: 'Stable',
      color: 'accent',
    },
  ];
}
