import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../Models/task';

@Component({
  selector: 'app-task-details',
  imports: [],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss'
})
export class TaskDetails {
  @Output() closeDetailView: EventEmitter<boolean> = new EventEmitter();
  @Input() selectedTask: Task | undefined = undefined;

}
