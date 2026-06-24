import { Component, OnInit, viewChild , ChangeDetectionStrategy} from '@angular/core';
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
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { NgScrollbar } from 'ngx-scrollbar';
import { MedicineListComponent } from '@shared/components/medicine-list/medicine-list.component';
import { ReportListComponent } from '@shared/components/report-list/report-list.component';
import { PatientActivityChartComponent } from '@shared/components/patient-activity-chart/patient-activity-chart.component';
import { PatientUpcomingDoseComponent } from '@shared/components/patient-upcoming-dose/patient-upcoming-dose.component';
import { PatientQuickActionsComponent } from '@shared/components/patient-quick-actions/patient-quick-actions.component';
import {
  PatientLabResultsComponent,
  LabResult,
} from '@shared/components/patient-lab-results/patient-lab-results.component';
import { PatientWeightChartComponent } from '@shared/components/patient-weight-chart/patient-weight-chart.component';
import { PatientHealthScoreComponent } from '@shared/components/patient-health-score/patient-health-score.component';
import { PatientAppointmentTimelineComponent } from '@shared/components/patient-appointment-timeline/patient-appointment-timeline.component';
import { PatientSymptomLogComponent } from '@shared/components/patient-symptom-log/patient-symptom-log.component';
import { PatientCalorieGaugeComponent } from '@shared/components/patient-calorie-gauge/patient-calorie-gauge.component';
import { PatientConsultationCountdownComponent } from '@shared/components/patient-consultation-countdown/patient-consultation-countdown.component';

export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
};

export type restRateChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

export interface Medicine {
  name: string;
  icon: string;
  dosage: string;
}

export type radialChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  plotOptions: ApexPlotOptions;
};
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    BreadcrumbComponent,
    NgApexchartsModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    NgScrollbar,
    MedicineListComponent,
    ReportListComponent,
    PatientActivityChartComponent,
    PatientUpcomingDoseComponent,
    PatientQuickActionsComponent,
    PatientLabResultsComponent,
    PatientWeightChartComponent,
    PatientHealthScoreComponent,
    PatientAppointmentTimelineComponent,
    PatientSymptomLogComponent,
    PatientCalorieGaugeComponent,
    PatientConsultationCountdownComponent,
  ],
})
export class DashboardComponent implements OnInit {
  readonly chart = viewChild.required<ChartComponent>('chart');
  public areaChartOptions!: Partial<areaChartOptions>;
  public radialChartOptions!: Partial<radialChartOptions>;
  public restRateChartOptions!: Partial<restRateChartOptions>;

  constructor() {}
  ngOnInit() {
    this.chart1();
    this.chart2();
    this.chart3();
  }

  labResults: LabResult[] = [
    {
      testName: 'Hemoglobin',
      date: '12 May 2024',
      result: '14.5',
      status: 'Normal',
      unit: 'g/dL',
    },
    {
      testName: 'Blood Glucose',
      date: '10 May 2024',
      result: '110',
      status: 'High',
      unit: 'mg/dL',
    },
    {
      testName: 'Cholesterol',
      date: '08 May 2024',
      result: '185',
      status: 'Normal',
      unit: 'mg/dL',
    },
    {
      testName: 'White Blood Cell',
      date: '05 May 2024',
      result: '3.2',
      status: 'Low',
      unit: 'K/uL',
    },
  ];

  medicineDataSource: Medicine[] = [
    {
      name: 'Econochlor (chloramphenicol-oral)',
      icon: 'fas fa-tablets col-green',
      dosage: '1 - 0 - 1',
    },
    {
      name: 'Desmopressin tabs',
      icon: 'fas fa-capsules col-red',
      dosage: '1 - 1 - 1',
    },
    {
      name: 'Abciximab-injection',
      icon: 'fas fa-syringe col-blue',
      dosage: '1 Daily',
    },
    {
      name: 'Kevzara sarilumab',
      icon: 'fas fa-pills col-orange',
      dosage: '0 - 0 - 1',
    },
    {
      name: 'Gentamicin-topical',
      icon: 'fas fa-capsules col-purple',
      dosage: '1 - 0 - 1',
    },
    {
      name: 'Paliperidone palmitate',
      icon: 'fas fa-tablets col-teal',
      dosage: '1 - 1 - 1',
    },
    {
      name: 'Sermorelin-injectable',
      icon: 'fas fa-syringe col-indigo',
      dosage: '1 Daily',
    },
    {
      name: 'Amoxicillin tabs',
      icon: 'fas fa-tablets col-green',
      dosage: '1 - 0 - 1',
    },
    {
      name: 'Lisinopril-oral',
      icon: 'fas fa-capsules col-red',
      dosage: '1 Daily',
    },
    {
      name: 'Metformin tabs',
      icon: 'fas fa-pills col-blue',
      dosage: '1 - 1 - 1',
    },
    {
      name: 'Atorvastatin-oral',
      icon: 'fas fa-tablets col-orange',
      dosage: '0 - 0 - 1',
    },
    {
      name: 'Omeprazole caps',
      icon: 'fas fa-capsules col-purple',
      dosage: '1 Daily',
    },
  ];

  // reports list
  reports = [
    { title: 'Blood Report', icon: 'far fa-file-pdf', colorClass: 'col-red' },
    {
      title: 'Mediclaim Documents',
      icon: 'far fa-file-word',
      colorClass: 'col-blue',
    },
    {
      title: 'Doctor Prescription',
      icon: 'far fa-file-alt',
      colorClass: 'col-black',
    },
    {
      title: 'X-Ray Files',
      icon: 'far fa-file-archive',
      colorClass: 'col-purple',
    },
    { title: 'Urine Report', icon: 'far fa-file-pdf', colorClass: 'col-red' },
    {
      title: 'Scanned Documents',
      icon: 'far fa-file-image',
      colorClass: 'col-teal',
    },
    {
      title: 'Eye Test Report',
      icon: 'far fa-file-pdf',
      colorClass: 'col-red',
    },
    {
      title: 'Dental Records',
      icon: 'far fa-file-word',
      colorClass: 'col-blue',
    },
    {
      title: 'Lab Results Summary',
      icon: 'far fa-file-alt',
      colorClass: 'col-black',
    },
    {
      title: 'MRI Scan Files',
      icon: 'far fa-file-archive',
      colorClass: 'col-purple',
    },
    {
      title: 'Vaccination Certificate',
      icon: 'far fa-file-pdf',
      colorClass: 'col-red',
    },
    {
      title: 'Health Assessment',
      icon: 'far fa-file-image',
      colorClass: 'col-teal',
    },
  ];
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
        height: 350,
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
        height: 265,
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
    this.restRateChartOptions = {
      series: [
        {
          name: 'Heart Rate',
          data: [69, 75, 72, 69, 75, 80, 87],
        },
      ],
      chart: {
        height: 340,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        foreColor: '#9aa0ac',
        toolbar: {
          show: false,
        },
      },
      colors: ['#FCB939'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 1,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        title: {
          text: 'Weekday',
        },
      },
      yaxis: {
        title: {
          text: 'Heart Rate',
        },
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
