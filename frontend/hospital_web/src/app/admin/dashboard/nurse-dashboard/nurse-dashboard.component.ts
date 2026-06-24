import { Component, OnInit, viewChild , ChangeDetectionStrategy} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTooltip,
  ApexStroke,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { BedOccupancyComponent } from '@shared/components/bed-occupancy/bed-occupancy.component';
import { CriticalAlertsComponent } from '@shared/components/critical-alerts/critical-alerts.component';
import { HandoffNotesComponent } from '@shared/components/handoff-notes/handoff-notes.component';

// Sparkline chart options type
export type sparklineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  colors: string[];
};

// Patient interface
export interface Patient {
  image: string;
  name: string;
  age: number;
  roomNumber: string;
  condition: string;
  conditionClass: string;
  assignedDoctor: string;
}

// Medication/Task interface
export interface NurseTask {
  patientName: string;
  taskType: string;
  taskDescription: string;
  time: string;
  status: string;
  statusClass: string;
}

// Medication Schedule interface
export interface MedicationSchedule {
  patientName: string;
  medicationName: string;
  dosage: string;
  time: string;
  status: string;
  statusClass: string;
}

// Pending Task interface
export interface PendingTask {
  id: number;
  taskName: string;
  category: string;
  priority: string;
  priorityClass: string;
  isCompleted: boolean;
  inProgress: boolean;
}

// Handoff Note interface
export interface HandoffNote {
  timestamp: string;
  img: string;
  sender: string;
  message: string;
  priority: string;
  priorityClass: string;
}

// Equipment Request interface
export interface EquipmentRequest {
  equipmentName: string;
  requestingPerson: string;
  department: string;
  reason: string;
  status: string;
  statusClass: string;
}

// Critical Alert interface
export interface CriticalAlert {
  id: string;
  img: string;
  patientName: string;
  roomNumber: string;
  alertType: string;
  message: string;
  time: string;
  timestamp: string;
  severity: string;
  severityClass: string;
  isNew: boolean;
}

// IV/Drip interface
export interface IVDrip {
  id: string;
  patientName: string;
  img: string;
  roomNumber: string;
  medication: string;
  concentration: string;
  rate: string;
  timeRemaining: string;
  progress: number;
  status: string;
  statusClass: string;
  startTime: string;
  nextChangeTime: string;
  percentRemaining: number;
  assignedNurse: string;
}

// Patient Feedback interface
export interface PatientFeedback {
  patientName: string;
  date: string;
  rating: number;
  comment: string;
  roomNumber: string;
  department: string;
  nurseName?: string;
}

export interface PatientVital {
  patientId: string;
  patientName: string;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  respirationRate: number;
  trends: {
    heartRate: number[];
    temperature: number[];
    oxygenSaturation: number[];
    respirationRate: number[];
  };
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    NgApexchartsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    NgScrollbar,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatChipsModule,
    MatBadgeModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatTabsModule,
    BedOccupancyComponent,
    CriticalAlertsComponent,
    HandoffNotesComponent,
  ],
})
export class NurseDashboardComponent implements OnInit {
  readonly chart = viewChild.required<ChartComponent>('chart');
  public sparklineOptions!: Partial<sparklineChartOptions>;

  selectedPatientVitals?: PatientVital;
  heartRateSeries: ApexAxisChartSeries = [];
  temperatureSeries: ApexAxisChartSeries = [];
  oxygenSeries: ApexAxisChartSeries = [];
  respirationSeries: ApexAxisChartSeries = [];

  heartRateColor: string[] = ['#4CAF50'];
  temperatureColor: string[] = ['#4CAF50'];
  oxygenColor: string[] = ['#4CAF50'];
  respirationColor: string[] = ['#4CAF50'];

  heartRateClass = 'col-green';
  temperatureClass = 'col-green';
  oxygenClass = 'col-green';
  respirationClass = 'col-green';

  // Added missing properties
  selectedPatientId: string = '';
  roomNumber: string = '';

  constructor() {}

  ngOnInit() {
    this.initSparklineCharts();

    // Set default selected patient
    if (this.patientVitals.length > 0) {
      const defaultPatientId = this.patientVitals[0].patientId;
      this.onPatientChange(defaultPatientId);
    }
  }

  ivDrips: IVDrip[] = [
    {
      id: '1',
      patientName: 'John Smith',
      img: 'assets/images/user/user19.jpg',
      medication: 'Normal Saline',
      concentration: '0.9%',
      rate: '125 ml/hr',
      timeRemaining: '2 hours',
      progress: 75,
      status: 'In Progress',
      statusClass: 'col-blue',
      startTime: '2025-08-21 08:00',
      nextChangeTime: '2025-08-21 10:00',
      percentRemaining: 25,
      assignedNurse: 'Nurse Johnson',
      roomNumber: '201-A',
    },
    {
      id: '2',
      patientName: 'Emily Carter',
      img: 'assets/images/user/user15.jpg',
      medication: 'Dextrose 5%',
      concentration: '5%',
      rate: '100 ml/hr',
      timeRemaining: '1.5 hours',
      progress: 60,
      status: 'In Progress',
      statusClass: 'col-blue',
      startTime: '2025-08-21 07:30',
      nextChangeTime: '2025-08-21 09:00',
      percentRemaining: 40,
      assignedNurse: 'Nurse Adams',
      roomNumber: '202-B',
    },
    {
      id: '3',
      patientName: 'Michael Lee',
      img: 'assets/images/user/user16.jpg',
      medication: 'Lactated Ringers',
      concentration: 'Standard',
      rate: '150 ml/hr',
      timeRemaining: '30 minutes',
      progress: 90,
      status: 'Almost Done',
      statusClass: 'col-orange',
      startTime: '2025-08-21 07:00',
      nextChangeTime: '2025-08-21 08:30',
      percentRemaining: 10,
      assignedNurse: 'Nurse Kim',
      roomNumber: '203-C',
    },
  ];

  patientFeedback: PatientFeedback[] = [
    {
      patientName: 'John Smith',
      date: '2025-08-21',
      rating: 5,
      comment: 'Excellent care received',
      roomNumber: '201-A',
      department: 'General Medicine',
      nurseName: 'Nurse Johnson',
    },
    {
      patientName: 'Emily Carter',
      date: '2025-08-20',
      rating: 4,
      comment: 'Very kind and attentive staff. Room could be cleaner.',
      roomNumber: '202-B',
      department: 'Cardiology',
      nurseName: 'Nurse Adams',
    },
    {
      patientName: 'Michael Lee',
      date: '2025-08-19',
      rating: 3,
      comment: 'Care was okay, but had to wait a long time for medication.',
      roomNumber: '203-C',
      department: 'Orthopedics',
      nurseName: 'Nurse Kim',
    },
  ];

  // Initialize patient vitals with sample data
  patientVitals: PatientVital[] = [
    {
      patientId: '1',
      patientName: 'John Smith',
      heartRate: 102,
      temperature: 36.8,
      oxygenSaturation: 98,
      respirationRate: 16,
      trends: {
        heartRate: [78, 95, 104, 73, 77],
        temperature: [36.5, 36.7, 36.8, 36.9, 36.8],
        oxygenSaturation: [97, 98, 98, 99, 98],
        respirationRate: [14, 15, 16, 16, 16],
      },
    },
    {
      patientId: '2',
      patientName: 'Emily Carter',
      heartRate: 88,
      temperature: 37.2,
      oxygenSaturation: 97,
      respirationRate: 18,
      trends: {
        heartRate: [85, 86, 87, 88, 88],
        temperature: [36.9, 37.0, 37.1, 37.2, 37.2],
        oxygenSaturation: [96, 96, 97, 97, 97],
        respirationRate: [17, 17, 18, 18, 18],
      },
    },
    {
      patientId: '3',
      patientName: 'Michael Lee',
      heartRate: 65,
      temperature: 36.4,
      oxygenSaturation: 99,
      respirationRate: 14,
      trends: {
        heartRate: [64, 63, 65, 65, 65],
        temperature: [36.2, 36.3, 36.3, 36.4, 36.4],
        oxygenSaturation: [98, 98, 99, 99, 99],
        respirationRate: [13, 14, 14, 14, 14],
      },
    },
  ];

  // Initialize critical alerts with complete data
  criticalAlerts: CriticalAlert[] = [
    {
      id: '1',
      patientName: 'John Smith',
      img: 'assets/images/user/user19.jpg',
      roomNumber: '201-A',
      alertType: 'Vital Signs',
      message: 'Heart rate elevated above normal range',
      time: '10:30 AM',
      timestamp: '10:30 AM',
      severity: 'High',
      severityClass: 'col-red',
      isNew: true,
    },
    {
      id: '2',
      patientName: 'Emily Carter',
      img: 'assets/images/user/user20.jpg',
      roomNumber: '202-B',
      alertType: 'IV Drip',
      message: 'IV fluid running low',
      time: '10:45 AM',
      timestamp: '10:45 AM',
      severity: 'Medium',
      severityClass: 'col-orange',
      isNew: true,
    },
    {
      id: '3',
      patientName: 'Michael Lee',
      img: 'assets/images/user/user21.jpg',
      roomNumber: '203-C',
      alertType: 'Respiratory',
      message: 'Oxygen saturation dropped below 94%',
      time: '10:50 AM',
      timestamp: '10:50 AM',
      severity: 'High',
      severityClass: 'col-red',
      isNew: true,
    },
  ];

  // Table columns
  patientDisplayedColumns: string[] = [
    'name',
    'age',
    'roomNumber',
    'condition',
    'assignedDoctor',
  ];
  taskDisplayedColumns: string[] = [
    'patientName',
    'taskType',
    'taskDescription',
    'time',
    'status',
  ];

  // Stats for cards
  totalPatients = 42;
  availableBeds = 18;
  assignedNurses = 12;
  avgResponseTime = '4.2 min';

  // Patient data
  patientData: Patient[] = [
    {
      image: 'assets/images/user/user1.jpg',
      name: 'John Smith',
      age: 45,
      roomNumber: '201-A',
      condition: 'Stable',
      conditionClass: 'col-green',
      assignedDoctor: 'Dr. Sarah Johnson',
    },
    {
      image: 'assets/images/user/user2.jpg',
      name: 'Emily Davis',
      age: 62,
      roomNumber: '105-B',
      condition: 'Critical',
      conditionClass: 'col-red',
      assignedDoctor: 'Dr. Michael Chen',
    },
    {
      image: 'assets/images/user/user3.jpg',
      name: 'Robert Wilson',
      age: 38,
      roomNumber: '310-C',
      condition: 'Stable',
      conditionClass: 'col-green',
      assignedDoctor: 'Dr. Lisa Wong',
    },
    {
      image: 'assets/images/user/user4.jpg',
      name: 'Maria Garcia',
      age: 71,
      roomNumber: '202-A',
      condition: 'Improving',
      conditionClass: 'col-blue',
      assignedDoctor: 'Dr. James Miller',
    },
    {
      image: 'assets/images/user/user5.jpg',
      name: 'David Brown',
      age: 29,
      roomNumber: '115-B',
      condition: 'Critical',
      conditionClass: 'col-red',
      assignedDoctor: 'Dr. Sarah Johnson',
    },
    {
      image: 'assets/images/user/user6.jpg',
      name: 'Linda Martinez',
      age: 55,
      roomNumber: '308-C',
      condition: 'Stable',
      conditionClass: 'col-green',
      assignedDoctor: 'Dr. Michael Chen',
    },
  ];

  // Nurse tasks data
  nurseTasks: NurseTask[] = [
    {
      patientName: 'John Smith',
      taskType: 'Medication',
      taskDescription: 'Administer Antibiotics',
      time: '08:00 AM',
      status: 'Completed',
      statusClass: 'col-green',
    },
    {
      patientName: 'Emily Davis',
      taskType: 'Vital Check',
      taskDescription: 'Blood Pressure & Temperature',
      time: '09:30 AM',
      status: 'Pending',
      statusClass: 'col-orange',
    },
    {
      patientName: 'Robert Wilson',
      taskType: 'Medication',
      taskDescription: 'Pain Management',
      time: '10:15 AM',
      status: 'Completed',
      statusClass: 'col-green',
    },
    {
      patientName: 'Maria Garcia',
      taskType: 'Assistance',
      taskDescription: 'Mobility Support',
      time: '11:00 AM',
      status: 'In Progress',
      statusClass: 'col-blue',
    },
    {
      patientName: 'David Brown',
      taskType: 'Medication',
      taskDescription: 'IV Fluids',
      time: '12:30 PM',
      status: 'Pending',
      statusClass: 'col-orange',
    },
    {
      patientName: 'Linda Martinez',
      taskType: 'Vital Check',
      taskDescription: 'Oxygen Saturation',
      time: '01:45 PM',
      status: 'Completed',
      statusClass: 'col-green',
    },
  ];

  // Table columns for new widgets
  medicationDisplayedColumns: string[] = [
    'patientName',
    'medicationName',
    'dosage',
    'time',
    'status',
  ];

  handoffDisplayedColumns: string[] = [
    'timestamp',
    'sender',
    'priority',
    'message',
  ];

  equipmentDisplayedColumns: string[] = [
    'equipmentName',
    'requestingPerson',
    'reason',
    'status',
  ];

  // Data for Today's Medication Schedule
  medicationSchedules: MedicationSchedule[] = [
    {
      patientName: 'John Smith',
      medicationName: 'Amoxicillin',
      dosage: '500mg',
      time: '08:00 AM',
      status: 'Completed',
      statusClass: 'col-green',
    },
    {
      patientName: 'Emily Davis',
      medicationName: 'Morphine',
      dosage: '10mg',
      time: '09:30 AM',
      status: 'Pending',
      statusClass: 'col-orange',
    },
    {
      patientName: 'Robert Wilson',
      medicationName: 'Ibuprofen',
      dosage: '400mg',
      time: '10:15 AM',
      status: 'Completed',
      statusClass: 'col-green',
    },
    {
      patientName: 'Maria Garcia',
      medicationName: 'Insulin',
      dosage: '12 units',
      time: '11:45 AM',
      status: 'Pending',
      statusClass: 'col-orange',
    },
    {
      patientName: 'David Brown',
      medicationName: 'Furosemide',
      dosage: '20mg',
      time: '12:30 PM',
      status: 'Pending',
      statusClass: 'col-orange',
    },
    {
      patientName: 'Linda Martinez',
      medicationName: 'Metoprolol',
      dosage: '50mg',
      time: '02:00 PM',
      status: 'Pending',
      statusClass: 'col-orange',
    },
  ];

  // Data for Pending Tasks Checklist
  pendingTasks: PendingTask[] = [
    {
      id: 1,
      taskName: 'Change IV for patient in Room 201',
      category: 'Patient Care',
      priority: 'High',
      priorityClass: 'col-red',
      isCompleted: false,
      inProgress: true,
    },
    {
      id: 2,
      taskName: 'Wound dressing for patient in Room 105',
      category: 'Wound Care',
      priority: 'Medium',
      priorityClass: 'col-orange',
      isCompleted: false,
      inProgress: false,
    },
    {
      id: 3,
      taskName: 'Complete patient assessment for new admission',
      category: 'Assessment',
      priority: 'High',
      priorityClass: 'col-red',
      isCompleted: false,
      inProgress: false,
    },
    {
      id: 4,
      taskName: 'Update patient charts for morning rounds',
      category: 'Documentation',
      priority: 'Medium',
      priorityClass: 'col-orange',
      isCompleted: true,
      inProgress: false,
    },
    {
      id: 5,
      taskName: 'Prepare discharge papers for Room 310',
      category: 'Documentation',
      priority: 'Low',
      priorityClass: 'col-blue',
      isCompleted: false,
      inProgress: false,
    },
  ];

  // Data for Handoff Notes
  handoffNotes: HandoffNote[] = [
    {
      timestamp: 'Today, 07:30 AM',
      sender: 'Nurse Johnson',
      img: 'assets/images/user/user19.jpg',
      message:
        'Patient in Room 201 complained of increased pain during night shift. Pain medication administered at 4:30 AM.',
      priority: 'Urgent',
      priorityClass: 'high-priority',
    },
    {
      timestamp: 'Today, 07:45 AM',
      sender: 'Dr. Chen',
      img: 'assets/images/user/user13.jpg',
      message:
        'Please monitor blood glucose levels for patient in Room 105 every 2 hours.',
      priority: 'Important',
      priorityClass: 'medium-priority',
    },
    {
      timestamp: 'Yesterday, 08:15 PM',
      sender: 'Nurse Williams',
      img: 'assets/images/user/user14.jpg',
      message:
        'Patient in Room 310 is scheduled for CT scan at 10:00 AM tomorrow. NPO after midnight.',
      priority: 'Routine',
      priorityClass: 'low-priority',
    },
    {
      timestamp: 'Yesterday, 09:30 PM',
      sender: 'Dr. Miller',
      img: 'assets/images/user/user15.jpg',
      message:
        'New medication orders for patient in Room 202. Please review chart.',
      priority: 'Important',
      priorityClass: 'medium-priority',
    },
  ];

  // Data for Equipment Requests
  equipmentRequests: EquipmentRequest[] = [
    {
      equipmentName: 'Infusion Pump',
      requestingPerson: 'Nurse Johnson',
      department: 'ICU',
      reason: 'Current pump malfunctioning',
      status: 'In Progress',
      statusClass: 'col-blue',
    },
    {
      equipmentName: 'Wheelchair',
      requestingPerson: 'Nurse Williams',
      department: 'General Ward',
      reason: 'Patient discharge',
      status: 'Completed',
      statusClass: 'col-green',
    },
    {
      equipmentName: 'Vital Signs Monitor',
      requestingPerson: 'Nurse Davis',
      department: 'Emergency',
      reason: 'Additional unit needed',
      status: 'Requested',
      statusClass: 'col-orange',
    },
    {
      equipmentName: 'Oxygen Concentrator',
      requestingPerson: 'Nurse Miller',
      department: 'Respiratory Unit',
      reason: 'Maintenance required',
      status: 'Requested',
      statusClass: 'col-orange',
    },
    {
      equipmentName: 'Defibrillator',
      requestingPerson: 'Nurse Thompson',
      department: 'Cardiology',
      reason: 'Device not functioning properly',
      status: 'In Progress',
      statusClass: 'col-blue',
    },
    {
      equipmentName: 'Suction Machine',
      requestingPerson: 'Nurse Allen',
      department: 'Surgical Ward',
      reason: 'Pre-op preparation',
      status: 'Completed',
      statusClass: 'col-green',
    },
    {
      equipmentName: 'Patient Bed',
      requestingPerson: 'Nurse Garcia',
      department: 'Pediatrics',
      reason: 'New admission',
      status: 'Requested',
      statusClass: 'col-orange',
    },
    {
      equipmentName: 'ECG Machine',
      requestingPerson: 'Nurse Brown',
      department: 'General Medicine',
      reason: 'Scheduled diagnostics',
      status: 'In Progress',
      statusClass: 'col-blue',
    },
  ];

  // Method to update task status
  updateTaskStatus(task: PendingTask): void {
    if (task.isCompleted) {
      task.inProgress = false;
    }
  }

  // Method to toggle task progress status
  toggleInProgress(task: PendingTask): void {
    if (!task.isCompleted) {
      task.inProgress = !task.inProgress;
    }
  }

  // Initialize sparkline charts for vitals
  private initSparklineCharts() {
    this.sparklineOptions = {
      chart: {
        type: 'line',
        height: 30,
        width: 100,
        sparkline: {
          enabled: true,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        marker: {
          show: false,
        },
      },
      colors: ['#4CAF50'],
    };
  }

  // Get selected patient vitals
  getSelectedPatientVitals(): PatientVital | undefined {
    return this.patientVitals.find(
      (p) => p.patientId === this.selectedPatientId
    );
  }

  // Change selected patient
  onPatientChange(patientId: string): void {
    this.selectedPatientId = patientId;
    this.selectedPatientVitals = this.patientVitals.find(
      (p) => p.patientId === patientId
    );

    if (this.selectedPatientVitals) {
      // reuse same series arrays; only replace data arrays
      this.heartRateSeries = [
        {
          name: 'Heart Rate',
          data: [...this.selectedPatientVitals.trends.heartRate],
        },
      ];
      this.temperatureSeries = [
        {
          name: 'Temperature',
          data: [...this.selectedPatientVitals.trends.temperature],
        },
      ];
      this.oxygenSeries = [
        {
          name: 'O₂ Saturation',
          data: [...this.selectedPatientVitals.trends.oxygenSaturation],
        },
      ];
      this.respirationSeries = [
        {
          name: 'Respiration Rate',
          data: [...this.selectedPatientVitals.trends.respirationRate],
        },
      ];

      this.updateVitalDerivedUI();
    }
  }

  private updateVitalDerivedUI(): void {
    if (!this.selectedPatientVitals) return;
    const v = this.selectedPatientVitals;

    this.heartRateColor = this.getSparklineColor('heartRate', v.heartRate);
    this.temperatureColor = this.getSparklineColor(
      'temperature',
      v.temperature
    );
    this.oxygenColor = this.getSparklineColor(
      'oxygenSaturation',
      v.oxygenSaturation
    );
    this.respirationColor = this.getSparklineColor(
      'respirationRate',
      v.respirationRate
    );

    this.heartRateClass =
      v.heartRate > 100 || v.heartRate < 60 ? 'col-red' : 'col-green';
    this.temperatureClass = v.temperature > 38.0 ? 'col-red' : 'col-green';
    this.oxygenClass = v.oxygenSaturation < 95 ? 'col-red' : 'col-green';
    this.respirationClass =
      v.respirationRate > 20 || v.respirationRate < 12
        ? 'col-red'
        : 'col-green';
  }

  // Get heart rate series for sparkline
  getHeartRateSeries(patientId: string): ApexAxisChartSeries {
    const patient = this.patientVitals.find((p) => p.patientId === patientId);
    return [
      {
        name: 'Heart Rate',
        data: patient ? patient.trends.heartRate : [],
      },
    ];
  }

  // Get temperature series for sparkline
  getTemperatureSeries(patientId: string): ApexAxisChartSeries {
    const patient = this.patientVitals.find((p) => p.patientId === patientId);
    return [
      {
        name: 'Temperature',
        data: patient ? patient.trends.temperature : [],
      },
    ];
  }

  // Get oxygen saturation series for sparkline
  getOxygenSeries(patientId: string): ApexAxisChartSeries {
    const patient = this.patientVitals.find((p) => p.patientId === patientId);
    return [
      {
        name: 'O₂ Saturation',
        data: patient ? patient.trends.oxygenSaturation : [],
      },
    ];
  }

  // Get respiration rate series for sparkline
  getRespirationSeries(patientId: string): ApexAxisChartSeries {
    const patient = this.patientVitals.find((p) => p.patientId === patientId);
    return [
      {
        name: 'Respiration Rate',
        data: patient ? patient.trends.respirationRate : [],
      },
    ];
  }

  // Get color for sparkline based on vital type and value
  getSparklineColor(vitalType: string, value: number): string[] {
    switch (vitalType) {
      case 'heartRate':
        return value > 100 || value < 60 ? ['#F44336'] : ['#4CAF50'];
      case 'temperature':
        return value > 38.0 ? ['#F44336'] : ['#4CAF50'];
      case 'oxygenSaturation':
        return value < 95 ? ['#F44336'] : ['#4CAF50'];
      case 'respirationRate':
        return value > 20 || value < 12 ? ['#F44336'] : ['#4CAF50'];
      default:
        return ['#4CAF50'];
    }
  }

  // Mark alert as read
  markAlertAsRead(alert: CriticalAlert) {
    alert.isNew = false;
  }

  // Get star array for ratings
  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  // Get empty star array for ratings
  getEmptyStarArray(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }

  onViewAlert(_alert: CriticalAlert) {
  }
}
