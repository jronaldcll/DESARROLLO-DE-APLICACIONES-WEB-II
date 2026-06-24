import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexResponsive,
  ApexGrid,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatTableModule } from '@angular/material/table';

import { MatCardModule } from '@angular/material/card';
import { NgScrollbar } from 'ngx-scrollbar';
import { PatientTblWidgetComponent } from '@shared/components/patient-tbl-widget/patient-tbl-widget.component';
import { OperationsTblWidgetComponent } from '@shared/components/operations-tbl-widget/operations-tbl-widget.component';
import { MatSelectModule } from '@angular/material/select';
import { AppointmentCardComponent } from '@shared/components/appointment-card/appointment-card.component';
import { SmallCardChartComponent } from '@shared/components/small-card-chart/small-card-chart.component';
import { EmpStatusComponent } from '@shared/components/emp-status/emp-status.component';
import { RouterModule } from '@angular/router';
import { ChartCard6Component } from '@shared/components/chart-card6/chart-card6.component';
import { ChartCard5Component } from '@shared/components/chart-card5/chart-card5.component';
import {
  MonthlyScheduleComponent,
  ScheduleActivity,
} from '@shared/components/monthly-schedule/monthly-schedule.component';
import { MiniCalendarComponent } from '@shared/components/mini-calendar/mini-calendar.component';
import { SmartInsightsComponent } from '@shared/components/smart-insights/smart-insights.component';
import { PatientSatisfactionComponent } from '@shared/components/patient-satisfaction/patient-satisfaction.component';
import { AvgWaitTimeComponent } from '@shared/components/avg-wait-time/avg-wait-time.component';
import { StaffOnDutyComponent } from '@shared/components/staff-on-duty/staff-on-duty.component';
import { LabReportStatusComponent } from '@shared/components/lab-report-status/lab-report-status.component';
import { PharmacyStatsComponent } from '@shared/components/pharmacy-stats/pharmacy-stats.component';
import { BloodBankStockComponent } from '@shared/components/blood-bank-stock/blood-bank-stock.component';
import { WardBedStatusComponent } from '@shared/components/ward-bed-status/ward-bed-status.component';
import { DoctorOnCallComponent } from '@shared/components/doctor-on-call/doctor-on-call.component';
import { ResourceMonitorComponent } from '@shared/components/resource-monitor/resource-monitor.component';
import { PatientReviewsComponent } from '@shared/components/patient-reviews/patient-reviews.component';
import { HealthAdvisoryComponent } from '@shared/components/health-advisory/health-advisory.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  grid: ApexGrid;
  colors: string[];
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    NgApexchartsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    NgScrollbar,
    MatMenuModule,
    MatIconModule,
    PatientTblWidgetComponent,
    OperationsTblWidgetComponent,
    AppointmentCardComponent,
    SmallCardChartComponent,
    EmpStatusComponent,
    RouterModule,
    ChartCard6Component,
    ChartCard5Component,
    MonthlyScheduleComponent,
    MiniCalendarComponent,
    SmartInsightsComponent,
    PatientSatisfactionComponent,
    AvgWaitTimeComponent,
    StaffOnDutyComponent,
    LabReportStatusComponent,
    PharmacyStatsComponent,
    BloodBankStockComponent,
    WardBedStatusComponent,
    DoctorOnCallComponent,
    ResourceMonitorComponent,
    PatientReviewsComponent,
    HealthAdvisoryComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  public areaChartOptions!: Partial<ChartOptions>;
  public smallChart1Options!: Partial<ChartOptions>;
  public smallChart2Options!: Partial<ChartOptions>;
  public smallChart3Options!: Partial<ChartOptions>;
  public smallChart4Options!: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;
  selectedTimePeriod: string = 'Monthly'; // Default value
  demoActivityData: { [date: string]: ScheduleActivity[] } = {};

  constructor() {}
  ngOnInit() {
    this.smallChart1();
    this.smallChart2();
    this.smallChart3();
    this.smallChart4();
    this.chart1();
    this.chart2();

    const today = new Date();
    this.generateDemoData(today.getFullYear(), today.getMonth());
  }

  initialDate: Date = new Date();
  currentYear: number = this.initialDate.getFullYear();
  currentMonth: number = this.initialDate.getMonth();

  handleDateChange(_date: Date) {
    // Handle the date change event from the monthly schedule component
    // You can add logic here to fetch or update activities for the selected date
  }

  private smallChart1() {
    this.smallChart1Options = {
      series: [
        {
          name: 'Appointments',
          data: [
            50, 61, 80, 50, 72, 52, 60, 41, 30, 45, 70, 40, 93, 63, 50, 62,
          ],
        },
      ],
      chart: {
        height: 70,
        type: 'area',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#6F42C1'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          '16-07-2018',
          '17-07-2018',
          '18-07-2018',
          '19-07-2018',
          '20-07-2018',
          '21-07-2018',
          '22-07-2018',
          '23-07-2018',
          '24-07-2018',
          '25-07-2018',
          '26-07-2018',
          '27-07-2018',
          '28-07-2018',
          '29-07-2018',
          '30-07-2018',
          '31-07-2018',
        ],
      },
      legend: {
        show: false,
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

  private smallChart2() {
    this.smallChart2Options = {
      series: [
        {
          name: 'Operations',
          data: [5, 6, 8, 5, 7, 5, 6, 4, 3, 4, 7, 4, 9, 6, 5, 6],
        },
      ],
      chart: {
        height: 70,
        type: 'area',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#FD7E14'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          '16-07-2018',
          '17-07-2018',
          '18-07-2018',
          '19-07-2018',
          '20-07-2018',
          '21-07-2018',
          '22-07-2018',
          '23-07-2018',
          '24-07-2018',
          '25-07-2018',
          '26-07-2018',
          '27-07-2018',
          '28-07-2018',
          '29-07-2018',
          '30-07-2018',
          '31-07-2018',
        ],
      },
      legend: {
        show: false,
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

  private smallChart3() {
    this.smallChart3Options = {
      series: [
        {
          name: 'New Patients',
          data: [
            50, 61, 80, 50, 72, 52, 60, 41, 30, 45, 70, 40, 93, 63, 50, 62,
          ],
        },
      ],
      chart: {
        height: 70,
        type: 'area',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#4CAF50'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          '16-07-2018',
          '17-07-2018',
          '18-07-2018',
          '19-07-2018',
          '20-07-2018',
          '21-07-2018',
          '22-07-2018',
          '23-07-2018',
          '24-07-2018',
          '25-07-2018',
          '26-07-2018',
          '27-07-2018',
          '28-07-2018',
          '29-07-2018',
          '30-07-2018',
          '31-07-2018',
        ],
      },
      legend: {
        show: false,
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

  private smallChart4() {
    this.smallChart4Options = {
      series: [
        {
          name: 'Earning',
          data: [
            150, 161, 180, 150, 172, 152, 160, 141, 130, 145, 170, 140, 193,
            163, 150, 162,
          ],
        },
      ],
      chart: {
        height: 70,
        type: 'area',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#2196F3'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          '16-07-2018',
          '17-07-2018',
          '18-07-2018',
          '19-07-2018',
          '20-07-2018',
          '21-07-2018',
          '22-07-2018',
          '23-07-2018',
          '24-07-2018',
          '25-07-2018',
          '26-07-2018',
          '27-07-2018',
          '28-07-2018',
          '29-07-2018',
          '30-07-2018',
          '31-07-2018',
        ],
      },
      legend: {
        show: false,
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
  onTimePeriodChange(_event: { value: string | number }): void {
    // Using _event parameter to satisfy linting
    this.chart1();
  }

  generateDemoData(year: number, month: number) {
    const totalDays = new Date(year, month + 1, 0).getDate();

    const samplePatients = [
      'John Doe',
      'Jane Smith',
      'Alice Brown',
      'Bob Johnson',
      'Eva Green',
      'Tom White',
    ];
    const sampleDoctors = ['Dr. Patel', 'Dr. Mehta', 'Dr. Sharma', 'Dr. Verma'];
    const sampleTypes = [
      'Routine Check-Up',
      'Follow-Up Visit',
      'Consultation',
      'Meeting',
      'Task',
    ];
    const sampleColors = [
      '#00bcd4',
      '#ffb4b4',
      '#b2f2e5',
      '#ffd54f',
      '#81c784',
    ];

    for (let day = 1; day <= totalDays; day++) {
      const dateKey = new Date(year, month, day).toISOString().slice(0, 10);
      const activityCount = Math.floor(Math.random() * 4) + 3; // Always 3 to 6

      const activities: ScheduleActivity[] = [];

      for (let i = 0; i < activityCount; i++) {
        const patientName =
          samplePatients[Math.floor(Math.random() * samplePatients.length)];
        const doctorName =
          sampleDoctors[Math.floor(Math.random() * sampleDoctors.length)];
        const type =
          sampleTypes[Math.floor(Math.random() * sampleTypes.length)];
        const timeHour = 9 + i;
        const time = `${timeHour < 10 ? '0' : ''}${timeHour}:00 AM`;
        const color =
          sampleColors[Math.floor(Math.random() * sampleColors.length)];

        activities.push({
          id: `${day}-${i}`,
          title: patientName,
          type,
          time,
          color,
          patientName,
          doctorName,
        });
      }

      this.demoActivityData[dateKey] = activities;
    }
  }

  private chart1() {
    let categories: string[] = [];
    let newPatientsData: number[] = [];
    let oldPatientsData: number[] = [];

    switch (this.selectedTimePeriod) {
      case 'Daily':
        categories = [
          '2024-11-01',
          '2024-11-02',
          '2024-11-03',
          '2024-11-04',
          '2024-11-05',
          '2024-11-06',
          '2024-11-07',
        ];
        newPatientsData = [5, 8, 6, 4, 7, 9, 10];
        oldPatientsData = [2, 3, 4, 3, 5, 6, 7];
        break;

      case 'Monthly':
        categories = [
          '2024-01',
          '2024-02',
          '2024-03',
          '2024-04',
          '2024-05',
          '2024-06',
          '2024-07',
        ];
        newPatientsData = [31, 40, 28, 51, 42, 85, 77];
        oldPatientsData = [11, 32, 45, 32, 34, 52, 41];
        break;

      case 'Yearly':
        categories = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
        newPatientsData = [200, 250, 300, 450, 600, 700, 800];
        oldPatientsData = [120, 180, 200, 300, 400, 500, 600];
        break;
    }

    this.areaChartOptions = {
      series: [
        {
          name: 'New Patients',
          data: newPatientsData,
        },
        {
          name: 'Old Patients',
          data: oldPatientsData,
        },
      ],
      chart: {
        height: 280,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#407fe4', '#E47E3C'],
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: categories,
        labels: {
          show: true,
          offsetX: 20,
          offsetY: 0,
        },
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
          show: true,
        },
      },
    };
  }
  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'Colds and Flu',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'Headaches',
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: 'Malaria',
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: 'Typhoid',
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        foreColor: '#9aa0ac',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 0.8,
        colors: ['#01B8AA', '#374649', '#FD625E', '#F2C80F'],
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
}
