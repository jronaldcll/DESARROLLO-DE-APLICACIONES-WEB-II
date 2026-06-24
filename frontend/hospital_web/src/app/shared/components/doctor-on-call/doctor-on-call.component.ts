import { Component , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-doctor-on-call',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgScrollbar,
  ],
  templateUrl: './doctor-on-call.component.html',
  styleUrl: './doctor-on-call.component.scss',
})
export class DoctorOnCallComponent {
  doctors = [
    {
      name: 'Dr. Sarah Smith',
      specialty: 'Cardiologist',
      image: 'assets/images/user/user1.jpg',
      status: 'Available',
    },
    {
      name: 'Dr. John Doe',
      specialty: 'Neurologist',
      image: 'assets/images/user/user2.jpg',
      status: 'In Surgery',
    },
    {
      name: 'Dr. Emily White',
      specialty: 'Pediatrician',
      image: 'assets/images/user/user3.jpg',
      status: 'Available',
    },
    {
      name: 'Dr. Michael Brown',
      specialty: 'Orthopedic Surgeon',
      image: 'assets/images/user/user4.jpg',
      status: 'Available',
    },
    {
      name: 'Dr. Olivia Davis',
      specialty: 'Dermatologist',
      image: 'assets/images/user/user5.jpg',
      status: 'On Leave',
    },
  ];
}
