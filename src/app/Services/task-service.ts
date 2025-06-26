import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../../Models/task';
import { catchError, map, Subject, throwError } from 'rxjs';
import { LogService } from './log-service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  errSubject = new Subject<HttpErrorResponse>();
  logService: LogService = inject(LogService);

  createTask(task: Task){
    const header = new HttpHeaders({'my-header': 'hello-world'});
    this.http.post<{name: string}>(
      'https://angular20httpclient-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json', 
      task, {headers: header})
    .pipe(catchError((err)=>{
      const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()};
      this.logService.logError(errorObj);
      return throwError(()=> err);
    }))
    .subscribe({
      error: (err) =>{
        this.errSubject.next(err);
      }
    });
  }

  updateTask(task: Task, id: string | undefined){
    this.http.put('https://angular20httpclient-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/'+ id +'.json', task)
    .pipe(catchError((err)=>{
      const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()};
      this.logService.logError(errorObj);
      return throwError(()=> err);
    }))
    .subscribe({
      error: (err) =>{
        this.errSubject.next(err);
      }
    });
  }

  deleteTask(id: string | undefined){
    this.http.delete('https://angular20httpclient-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/' + id +'.json')
    .pipe(catchError((err)=>{
      const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()};
      this.logService.logError(errorObj);
      return throwError(()=> err);
    }))
    .subscribe({
      error: (err) =>{
        this.errSubject.next(err);
      }
    });
  }

  getAllTask(){
    return this.http.get<{[key: string]: Task}>('https://angular20httpclient-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json')
    .pipe(map((response)=>{
      let tasks = [];
      for(let key in response){
        if(response.hasOwnProperty(key)){
          tasks.push({...response[key], id: key});
        }
      }
      return tasks;
    }),
    catchError((err)=>{
      const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()};
      this.logService.logError(errorObj);
      return throwError(()=> err)
    }))
  }

  getTaskDetails(id: string | undefined){
    return this.http.get('https://angular20httpclient-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/'+ id +'.json')
      .pipe(catchError((err)=>{
        const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()};
        this.logService.logError(errorObj);
        return throwError(()=> err);
      }))
  }
}
