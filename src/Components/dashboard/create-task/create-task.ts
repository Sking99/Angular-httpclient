import { AfterViewInit, Component, EventEmitter, Input, input, output, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../../Models/task';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.scss'
})
export class CreateTask implements AfterViewInit{
  ngAfterViewInit(): void {
    const task = this.selectedTask();
    console.log(task);
    if (task) {
      this.taskForm.patchValue(task);
    }
  }
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  editMode = input<boolean>(false);
  // @Input() editMode: boolean = false;
  selectedTask = input<Task>();

  emitTask = output<Task>();

  taskForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    assignedTo: new FormControl(''),
    createdAt: new FormControl(new Date()),
    priority: new FormControl(''),
    status: new FormControl('')
  });

  craeteTask(){
    this.emitTask.emit(this.taskForm.value);
    this.CloseForm.emit(false);
  }

  OnCloseForm(){
    this.CloseForm.emit(false);
  }
}
