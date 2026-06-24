import { CommonModule } from '@angular/common';
import { Component, input , ChangeDetectionStrategy} from '@angular/core';
import { MatTableModule } from '@angular/material/table';

interface Task {
  userImage: string;
  userName: string;
  taskDetails: string;
  status: string;
  statusClass: string;
  manager: string;
  progress: number;
  progressClass: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-assign-task',
  imports: [MatTableModule, CommonModule],
  templateUrl: './assign-task.component.html',
  styleUrl: './assign-task.component.scss',
})
export class AssignTaskComponent {
  readonly tasks = input<Task[]>([]);
}
