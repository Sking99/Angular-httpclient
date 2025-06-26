import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  http: HttpClient = inject(HttpClient);

  logError(data: {statusCode: number, errorMessage: string, dateTime: Date}){
    this.http.post('https://angular20httpclient-default-rtdb.asia-southeast1.firebasedatabase.app/log.json', data)
    .subscribe();
  }

  fetchError(){
    this.http.get('https://angular20httpclient-default-rtdb.asia-southeast1.firebasedatabase.app/log.json')
    .subscribe();
  }
}
