import { Component } from '@angular/core';
import { CreateTask } from './create-task/create-task';
import { TaskDetails } from './task-details/task-details';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTask],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  showCreateTaskForm: boolean = false;

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }
}
