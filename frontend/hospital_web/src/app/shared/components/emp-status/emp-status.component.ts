import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

export interface Employee {
  image: string;
  name: string;
  email: string;
  qualification: string;
  status: string;
  statusClass: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-emp-status',
  imports: [MatCardModule, MatButtonModule, MatTableModule, CommonModule],
  templateUrl: './emp-status.component.html',
  styleUrl: './emp-status.component.scss',
})
export class EmpStatusComponent {
  empDisplayedColumns: string[] = ['name', 'status'];
  empDataSource: Employee[] = [
    {
      image: 'assets/images/user/user5.jpg',
      name: 'Dr.Jay Soni',
      email: 'test@gmail.com',
      qualification: '(MBBS,MD)',
      status: 'Available',
      statusClass: 'badge badge-solid-green',
    },
    {
      image: 'assets/images/user/user6.jpg',
      name: 'Dr.Sarah Smith',
      email: 'test@gmail.com',
      qualification: '(BDS,MDS)',
      status: 'Absent',
      statusClass: 'badge badge-solid-orange',
    },
    {
      image: 'assets/images/user/user3.jpg',
      name: 'Dr.Megha Trivedi',
      email: 'test@gmail.com',
      qualification: '(BHMS)',
      status: 'Available',
      statusClass: 'badge badge-solid-green',
    },
    {
      image: 'assets/images/user/user2.jpg',
      name: 'Dr.John Deo',
      email: 'test@gmail.com',
      qualification: '(MBBS,MS)',
      status: 'Available',
      statusClass: 'badge badge-solid-green',
    },
    {
      image: 'assets/images/user/user1.jpg',
      name: 'Dr.Jacob Ryan',
      email: 'test@gmail.com',
      qualification: '(MBBS,MD)',
      status: 'Absent',
      statusClass: 'badge badge-solid-orange',
    },
    {
      image: 'assets/images/user/user8.jpg',
      name: 'Dr.Jay Soni',
      email: 'test@gmail.com',
      qualification: '(MBBS)',
      status: 'Available',
      statusClass: 'badge badge-solid-green',
    },
    {
      image: 'assets/images/user/user9.jpg',
      name: 'Dr.Linda Carter',
      email: 'test@gmail.com',
      qualification: '(MBBS, DNB)',
      status: 'Available',
      statusClass: 'badge badge-solid-green',
    },
    {
      image: 'assets/images/user/user10.jpg',
      name: 'Dr.Rajesh Kumar',
      email: 'test@gmail.com',
      qualification: '(MD, FRCP)',
      status: 'Absent',
      statusClass: 'badge badge-solid-orange',
    },
    {
      image: 'assets/images/user/user11.jpg',
      name: 'Dr.Nina Patel',
      email: 'test@gmail.com',
      qualification: '(BDS)',
      status: 'Available',
      statusClass: 'badge badge-solid-green',
    },
    {
      image: 'assets/images/user/user1.jpg',
      name: 'Dr.Michael Lee',
      email: 'test@gmail.com',
      qualification: '(MBBS, MD)',
      status: 'Available',
      statusClass: 'badge badge-solid-green',
    },
  ];
}
