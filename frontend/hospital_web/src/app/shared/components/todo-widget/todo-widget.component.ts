import { MatTooltipModule } from '@angular/material/tooltip';
import { Component, input, output , ChangeDetectionStrategy} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDropList,
  CdkDrag,
  CdkDragHandle,
  CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';

import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgClass } from '@angular/common';

interface Todo {
  title: string;
  done: boolean;
  priority: 'Low' | 'Normal' | 'High';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-todo-widget',
    imports: [
        MatIcon,
        MatCheckbox,
        CdkDropList,
        CdkDrag,
        CdkDragHandle,
        CdkDragPlaceholder,
        NgClass,
        MatTooltipModule,
    ],
    templateUrl: './todo-widget.component.html',
    styleUrl: './todo-widget.component.scss'
})
export class TodoWidgetComponent {
  readonly todos = input<Todo[]>([]);
  readonly todoToggled = output<Todo>();
  readonly todosUpdated = output<Todo[]>();

  toggle(todo: Todo): void {
    todo.done = !todo.done;
    this.todoToggled.emit(todo);
  }

  drop(event: CdkDragDrop<string[]>): void {
    const todos = this.todos();
    moveItemInArray(todos, event.previousIndex, event.currentIndex);
    this.todosUpdated.emit(todos);
  }

  trackByFn(index: number, todo: Todo): string {
    return todo.title; // or use a unique identifier if available
  }
}
