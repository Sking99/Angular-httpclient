import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CreateTask } from './create-task/create-task';
import { Task } from '../../Models/task';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { TaskService } from '../../app/Services/task-service';
import { TaskDetails } from './task-details/task-details';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTask, NgClass, TaskDetails],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit, OnDestroy{
  showCreateTaskForm: boolean = false;
  showTaskDetails: boolean = false;
  taskList: Task[] = [];
  currentTaskId: string | undefined;
  editMode: boolean = false;
  selectedTask: Task | undefined;
  isLoading = signal<boolean>(false);
  errorMssg: string | null = null;

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
    this.selectedTask = {title: '', description: '', assignedTo: '', createdAt: '', priority: '', status: ''};

  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
    this.editMode = false;
  }

  fetchTasks(){
    this.fetchTaskData();
  }

  http: HttpClient = inject(HttpClient);
  taskService: TaskService = inject(TaskService);

  createOrUpdateTask(data: Task){
    if(!this.editMode){
      this.taskService.createTask(data);
    }else{
      this.taskService.updateTask(data, this.currentTaskId);
    }
    
    this.fetchTaskData();
  }

  private fetchTaskData(){
    this.isLoading.set(true);
    this.taskService.getAllTask()
    .subscribe({
      next: (tasks) =>{
        this.taskList = tasks;
        this.isLoading.set(false);
      },
      error: (err) =>{
        this.handleHttpError(err);
        this.isLoading.set(false);
      }
    });
  }

  private handleHttpError(err: HttpErrorResponse){
    this.errorMssg = err.error.error;
    setTimeout(()=>{
      this.errorMssg = null;
    }, 3000);
  }

  errorSub!: Subscription;

  ngOnInit(): void {
    this.fetchTaskData();
    this.errorSub = this.taskService.errSubject.subscribe({
      next: (httpError)=>{
        this.handleHttpError(httpError);
      }
    })
  }

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }

  deleteTask(id: string | undefined){
    this.taskService.deleteTask(id);
    this.fetchTaskData();
  }

  deleteAllTasks(){
    this.taskService.deleteTask('');
    this.fetchTaskData();
  }

  onEditClick(id: string | undefined){
    this.currentTaskId = id;
    this.editMode = true;
    this.showCreateTaskForm = true;
    this.selectedTask = this.taskList.find((task)=> task.id === id);
  }

  showTask(id: string | undefined){
    this.showTaskDetails = true;
    this.taskService.getTaskDetails(id).subscribe((data)=>{
      this.selectedTask = data as Task;
    })
  }
}
