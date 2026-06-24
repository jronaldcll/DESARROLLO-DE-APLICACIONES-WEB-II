import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-db2-revenue-cards-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './db2-revenue-cards-grid.component.html',
  styleUrl: './db2-revenue-cards-grid.component.scss',
})
export class Db2RevenueCardsGridComponent {
  items = [
    {
      label: 'Telemedicine',
      amount: '$4,900',
      trend: '+20%',
      icon: 'videocam',
      color: 'blue',
    },
    {
      label: 'Pharmacy Sales',
      amount: '$12,750',
      trend: '+15%',
      icon: 'medication',
      color: 'green',
    },
    {
      label: 'Unpaid Invoices',
      amount: '$2,560',
      trend: '-5%',
      icon: 'receipt_long',
      color: 'orange',
    },
    {
      label: 'Monthly Billing',
      amount: '$98,390',
      trend: '+30%',
      icon: 'account_balance_wallet',
      color: 'purple',
    },
  ];
}
