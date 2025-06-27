import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const logInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Log Interceptor called");
  return next(req).pipe(tap((event)=>{
    if(event.type === HttpEventType.Response){
      console.log("Log Interceptor exit");
    }
  }));
};
