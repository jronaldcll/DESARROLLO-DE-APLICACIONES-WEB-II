import { Component, inject, ViewChild, ElementRef, AfterViewInit , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

interface SearchResult {
  title: string;
  category: string;
  icon: string;
  route: string;
  description?: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-global-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent implements AfterViewInit {
  private dialogRef = inject(MatDialogRef<GlobalSearchComponent>);
  private router = inject(Router);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  searchQuery = '';
  results: SearchResult[] = [];
  selectedIndex = 0;

  // Mock Data
  private allData: SearchResult[] = [
    {
      title: 'Main Dashboard',
      category: 'Navigation',
      icon: 'dashboard',
      route: '/admin/dashboard/main',
    },
    {
      title: 'Doctor Dashboard',
      category: 'Navigation',
      icon: 'person',
      route: '/doctor/dashboard',
    },
    {
      title: 'Patient Dashboard',
      category: 'Navigation',
      icon: 'hotel',
      route: '/patient/dashboard',
    },
    {
      title: 'Add New Patient',
      category: 'Actions',
      icon: 'person_add',
      route: '/admin/patients/add-patient',
    },
    {
      title: 'Book Appointment',
      category: 'Actions',
      icon: 'event',
      route: '/admin/appointment/bookAppointment',
    },
    {
      title: 'View Reports',
      category: 'Reports',
      icon: 'description',
      route: '/admin/reports/all-reports',
    },
    {
      title: 'John Doe',
      category: 'Patients',
      icon: 'account_circle',
      route: '/admin/patients/patient-profile',
      description: 'Patient ID: #PT-9921',
    },
    {
      title: 'Sarah Smith',
      category: 'Patients',
      icon: 'account_circle',
      route: '/admin/patients/patient-profile',
      description: 'Patient ID: #PT-8832',
    },
    {
      title: 'Dr. Emily Watson',
      category: 'Doctors',
      icon: 'medical_services',
      route: '/admin/doctors/doctor-profile',
      description: 'Cardiology Specialist',
    },
    {
      title: 'Dr. Michael Chen',
      category: 'Doctors',
      icon: 'medical_services',
      route: '/admin/doctors/doctor-profile',
      description: 'Neurology Specialist',
    },
    {
      title: 'System Settings',
      category: 'Settings',
      icon: 'settings',
      route: '/admin/settings/general',
    },
  ];

  constructor() {
    this.results = this.allData.slice(0, 5); // Show some defaults
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 100);
  }

  handleKeydown(event: KeyboardEvent) {
    if (this.results.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.results.length;
      this.scrollToSelected();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex =
        (this.selectedIndex - 1 + this.results.length) % this.results.length;
      this.scrollToSelected();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const selected = this.results[this.selectedIndex];
      if (selected) {
        this.navigateTo(selected.route);
      }
    } else if (event.key === 'Tab') {
      // If there are results, let the user move through them with arrows instead of just tab
      if (this.results.length > 0) {
        // We can just set focus or handle as arrow down
      }
    }
  }

  private scrollToSelected() {
    const listElement = document.querySelector('.search-body');
    const selectedElement = document.querySelector('.result-item.active');
    if (listElement && selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest' });
    }
  }

  onSearch() {
    this.selectedIndex = 0;
    if (!this.searchQuery.trim()) {
      this.results = this.allData.slice(0, 5);
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.results = this.allData
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query),
      )
      .slice(0, 8);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
