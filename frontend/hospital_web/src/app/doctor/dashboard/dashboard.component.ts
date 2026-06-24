import {
  Component,
  OnInit,
  ViewEncapsulation,
  viewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexFill,
  ApexGrid,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { TodaysAppointmentComponent } from '@shared/components/todays-appointment/todays-appointment.component';
import { TodoWidgetComponent } from '@shared/components/todo-widget/todo-widget.component';
import { DocWelcomeCardComponent } from '@shared/components/doc-welcome-card/doc-welcome-card.component';
import { EmpStatusComponent } from '@shared/components/emp-status/emp-status.component';
import { AppointmentWidgetComponent } from '@shared/components/appointment-widget/appointment-widget.component';
import { MiniCalendarComponent } from '@shared/components/mini-calendar/mini-calendar.component';
import { ProjectHoursComponent } from '@shared/components/project-hours/project-hours.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {
  FeedbackData,
  FeedbackWidgetComponent,
} from '@shared/components/feedback-widget/feedback-widget.component';
import { EmergencyListComponent } from '@shared/components/emergency-list/emergency-list.component';
export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
};

export type linechartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: string[];
};

export type radialChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  plotOptions: ApexPlotOptions;
};

export type chartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  labels: string[];
  fill: ApexFill;
  stroke: ApexStroke;
  colors: string[];
};

export type donutChartOptions = {
  series: number[];
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

interface Todo {
  title: string;
  done: boolean;
  priority: 'Low' | 'Normal' | 'High';
}

// Surgery interface
interface Surgery {
  patientName: string;
  patientId: string;
  patientImg: string;
  surgeryType: string;
  date: string;
  time: string;
  doctor: string;
  status: string;
  statusClass: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    BreadcrumbComponent,
    NgApexchartsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    CommonModule,
    NgScrollbar,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatTooltipModule,
    TodaysAppointmentComponent,
    TodoWidgetComponent,
    DocWelcomeCardComponent,
    EmpStatusComponent,
    AppointmentWidgetComponent,
    MiniCalendarComponent,
    ProjectHoursComponent,
    FeedbackWidgetComponent,
    EmergencyListComponent,
  ],
})
export class DashboardComponent implements OnInit {
  readonly chart = viewChild.required<ChartComponent>('chart');
  public areaChartOptions!: Partial<areaChartOptions>;
  public radialChartOptions!: Partial<radialChartOptions>;
  public linechartOptions!: Partial<linechartOptions>;
  public chartOptions!: Partial<chartOptions>;
  public performanceChartOptions!: Partial<linechartOptions>;
  public revenueChartOptions!: Partial<areaChartOptions>;
  public appointmentsChartOptions!: Partial<donutChartOptions>;
  constructor() {}

  ngOnInit() {
    this.chart1();
    this.chart2();
    this.chart3();
    this.chart4();
    this.initAppointmentsChart();
    this.initPerformanceChart();
    this.initRevenueChart();
  }

  // Surgery table columns
  surgeryDisplayedColumns: string[] = [
    'patient',
    'surgeryType',
    'date',
    'doctor',
    'status',
  ];

  // Upcoming surgeries data
  upcomingSurgeries: Surgery[] = [
    {
      patientName: 'John Smith',
      patientId: 'PT-0025',
      patientImg: 'assets/images/user/user1.jpg',
      surgeryType: 'Cardiac Bypass',
      date: '15 June 2024',
      time: '09:00-11:30',
      doctor: 'Dr. Sarah Johnson',
      status: 'Scheduled',
      statusClass: 'status-scheduled',
    },
    {
      patientName: 'Emily Davis',
      patientId: 'PT-0078',
      patientImg: 'assets/images/user/user2.jpg',
      surgeryType: 'Appendectomy',
      date: '15 June 2024',
      time: '13:00-14:30',
      doctor: 'Dr. Michael Chen',
      status: 'Urgent',
      statusClass: 'status-urgent',
    },
    {
      patientName: 'Robert Wilson',
      patientId: 'PT-0036',
      patientImg: 'assets/images/user/user3.jpg',
      surgeryType: 'Knee Replacement',
      date: '16 June 2024',
      time: '10:00-12:30',
      doctor: 'Dr. James Miller',
      status: 'Scheduled',
      statusClass: 'status-scheduled',
    },
    {
      patientName: 'Maria Garcia',
      patientId: 'PT-0042',
      patientImg: 'assets/images/user/user4.jpg',
      surgeryType: 'Cataract Removal',
      date: '16 June 2024',
      time: '14:00-15:00',
      doctor: 'Dr. Lisa Wong',
      status: 'Delayed',
      statusClass: 'status-delayed',
    },
    {
      patientName: 'Daniel Thompson',
      patientId: 'PT-0084',
      patientImg: 'assets/images/user/user5.jpg',
      surgeryType: 'Hip Replacement',
      date: '17 June 2024',
      time: '08:30-11:00',
      doctor: 'Dr. Angela Roberts',
      status: 'Scheduled',
      statusClass: 'status-scheduled',
    },
    {
      patientName: 'Sophia Martinez',
      patientId: 'PT-0092',
      patientImg: 'assets/images/user/user6.jpg',
      surgeryType: 'Tonsillectomy',
      date: '17 June 2024',
      time: '12:00-13:00',
      doctor: 'Dr. Kevin Patel',
      status: 'Urgent',
      statusClass: 'status-urgent',
    },
    {
      patientName: 'William Anderson',
      patientId: 'PT-0067',
      patientImg: 'assets/images/user/user7.jpg',
      surgeryType: 'Spinal Fusion',
      date: '18 June 2024',
      time: '09:00-12:00',
      doctor: 'Dr. Rachel Green',
      status: 'Scheduled',
      statusClass: 'status-scheduled',
    },
    {
      patientName: 'Olivia Brown',
      patientId: 'PT-0055',
      patientImg: 'assets/images/user/user8.jpg',
      surgeryType: 'Gallbladder Removal',
      date: '18 June 2024',
      time: '13:30-15:00',
      doctor: 'Dr. Henry Liu',
      status: 'Delayed',
      statusClass: 'status-delayed',
    },
    {
      patientName: 'Liam Walker',
      patientId: 'PT-0101',
      patientImg: 'assets/images/user/user9.jpg',
      surgeryType: 'Hernia Repair',
      date: '19 June 2024',
      time: '10:00-11:30',
      doctor: 'Dr. Emily Turner',
      status: 'Scheduled',
      statusClass: 'status-scheduled',
    },
  ];

  // TODO start
  tasks: Todo[] = [
    { title: 'Review patient charts', done: false, priority: 'High' },
    { title: 'Complete patient prescriptions', done: false, priority: 'High' },
    {
      title: 'Follow-up with patients for test results',
      done: false,
      priority: 'Normal',
    },
    {
      title: 'Consult with specialists on patient cases',
      done: false,
      priority: 'High',
    },
    { title: 'Organize medical supplies', done: false, priority: 'Low' },
    {
      title: 'Check and update patient schedules',
      done: false,
      priority: 'High',
    },
    {
      title: 'Prepare for medical conference',
      done: false,
      priority: 'Normal',
    },
    {
      title: 'Answer patient queries via email or phone',
      done: false,
      priority: 'Normal',
    },
    { title: 'Attend medical staff meeting', done: false, priority: 'High' },
    {
      title: 'Update medical records for patients',
      done: false,
      priority: 'High',
    },
    {
      title: 'Plan continuing medical education (CME)',
      done: false,
      priority: 'Low',
    },
    { title: 'Review latest medical research', done: false, priority: 'Low' },
    {
      title: 'Check in with medical assistant/nurses',
      done: false,
      priority: 'Normal',
    },
    { title: 'Schedule surgery or procedures', done: false, priority: 'High' },
  ];

  onTodoToggled(_todo: Todo) {
    // Using _todo parameter to satisfy linting
  }

  onTodosUpdated(_updatedTodos: Todo[]) {
    // Using _updatedTodos parameter to satisfy linting
  }
  // TODO end

  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: 'New Patients',
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: 'Old Patients',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 320,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#7D4988', '#66BB6A'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },

      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
  }
  private chart2() {
    this.radialChartOptions = {
      series: [44, 55, 67],
      chart: {
        height: 280,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function () {
                return '249';
              },
            },
          },
        },
      },
      colors: ['#ffc107', '#3f51b5', '#8bc34a'],

      labels: ['Face TO Face', 'E-Consult', 'Available'],
    };
  }
  private chart3() {
    this.linechartOptions = {
      series: [
        {
          name: 'Male',
          data: [44, 55, 57, 56, 61, 58],
        },
        {
          name: 'Female',
          data: [76, 85, 101, 98, 87, 105],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#786BED', '#AEAEAE'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      yaxis: {},
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }

  private chart4() {
    this.chartOptions = {
      series: [60],
      chart: {
        type: 'radialBar',
        height: 80,
        width: 80,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '50%',
          },
          dataLabels: {
            show: true,
            name: {
              show: false, // Hide the name (e.g., "Patients")
            },
            value: {
              show: true, // Show the number (e.g., 60)
              fontSize: '16px',
              fontWeight: 600,
              color: '#FF4D4F',
              offsetY: 5,
            },
          },
        },
      },
      fill: {
        type: 'solid',
      },
      stroke: {
        lineCap: 'round',
      },
      labels: [''],
      colors: ['#FF4D4F'],
    };
  }

  private initAppointmentsChart() {
    this.appointmentsChartOptions = {
      series: [28, 24, 4],
      chart: {
        type: 'donut',
        height: 130,
      },
      labels: ['Scheduled', 'Completed', 'Cancelled'],
      colors: ['#42A5F5', '#66BB6A', '#EF5350'],
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
    };
  }

  private initPerformanceChart() {
    this.performanceChartOptions = {
      series: [
        {
          name: 'Patients',
          data: [22, 28, 24, 19, 26, 24, 20],
        },
      ],
      chart: {
        height: 130,
        type: 'bar',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#4CAF50'],
      plotOptions: {
        bar: {
          columnWidth: '50%',
          borderRadius: 2,
        },
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }

  private initRevenueChart() {
    this.revenueChartOptions = {
      series: [
        {
          name: 'Walk-ins',
          data: [31, 40, 28, 51, 42, 40, 30],
        },
        {
          name: 'Follow-ups',
          data: [25, 32, 30, 35, 40, 25, 30],
        },
        {
          name: 'Online Consults',
          data: [15, 25, 20, 25, 30, 20, 15],
        },
      ],
      chart: {
        height: 120,
        type: 'area',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#4CAF50', '#2196F3', '#9C27B0'],
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          show: false,
        },
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }
  // appointment list
  appointmentList = [
    {
      name: 'Cara Stevens',
      diseases: 'Fever',
      date: "12 June '20",
      time: '09:00-10:00',
      imageUrl: 'assets/images/user/user21.jpg',
    },
    {
      name: 'Airi Satou',
      diseases: 'Cholera',
      date: "13 June '20",
      time: '11:00-12:00',
      imageUrl: 'assets/images/user/user12.jpg',
    },
    {
      name: 'Jens Brincker',
      diseases: 'Jaundice',
      date: "15 June '20",
      time: '09:30-10:30',
      imageUrl: 'assets/images/user/user13.jpg',
    },
    {
      name: 'Angelica Ramos',
      diseases: 'Typhoid',
      date: "16 June '20",
      time: '14:00-15:00',
      imageUrl: 'assets/images/user/user14.jpg',
    },
    {
      name: 'Cara Stevens',
      diseases: 'Malaria',
      date: "18 June '20",
      time: '11:00-12:30',
      imageUrl: 'assets/images/user/user15.jpg',
    },
    {
      name: 'Jacob Ryan',
      diseases: 'Infection',
      date: "22 June '20",
      time: '13:00-14:15',
      imageUrl: 'assets/images/user/user16.jpg',
    },
  ];

  patientFeedback: FeedbackData = {
    score: 4.8,
    series: [68, 24, 8],
    labels: ['Excellent', 'Good', 'Poor'],
    colors: ['#4CAF50', '#FFC107', '#F44336'],
  };

  emergencyCases = [
    {
      patientName: 'John Doe',
      caseType: 'critical',
      caseDescription: 'Cardiac Arrest',
      timeAgo: '10 min ago',
    },
    {
      patientName: 'Sarah Smith',
      caseType: 'urgent',
      caseDescription: 'Severe Trauma',
      timeAgo: '25 min ago',
    },
    {
      patientName: 'Mike Johnson',
      caseType: 'critical',
      caseDescription: 'Stroke',
      timeAgo: '45 min ago',
    },
    {
      patientName: 'Emily Davis',
      caseType: 'urgent',
      caseDescription: 'Severe Burns',
      timeAgo: '1 hr ago',
    },
    {
      patientName: 'David Wilson',
      caseType: 'critical',
      caseDescription: 'Multiple Fractures',
      timeAgo: '1 hr 20 min ago',
    },
  ];
}
