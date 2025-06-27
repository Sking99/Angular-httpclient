import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({headers: req.headers.append('auth', 'abcd')});
  console.log("Auth Interceptor called");
  return next(modifiedReq).pipe(tap((event)=>{
    if(event.type === HttpEventType.Response){
      console.log("Auth Interceptor Exit");
    }
  }));
};
