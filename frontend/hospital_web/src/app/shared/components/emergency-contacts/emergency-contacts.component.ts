import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MatButtonModule } from '@angular/material/button';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-emergency-contacts',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    NgScrollbar,
  ],
  templateUrl: './emergency-contacts.component.html',
  styleUrl: './emergency-contacts.component.scss',
})
export class EmergencyContactsComponent {
  contacts = [
    { dept: 'Main Emergency', phone: '911-001', ext: '101' },
    { dept: 'Blood Bank', phone: '911-005', ext: '204' },
    { dept: 'Security', phone: '911-009', ext: '999' },
    { dept: 'Ambulance', phone: '911-010', ext: '111' },
    { dept: 'Lab Services', phone: '911-015', ext: '302' },
    { dept: 'Fire Safety', phone: '911-020', ext: '404' },
  ];
}

