import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { environment } from '../enviroment';


export const apiInterceptor: HttpInterceptorFn = ( req: HttpRequest<any>,
  next: HttpHandlerFn) => {
   const apiUrl = environment.apiUrl;
   const apiKey = environment.apiKey;
   {
    const params = req.params
      .set('apikey', apiKey)
      .append('r', '5');
  
    const modifiedRequest = req.clone({
      url: `${apiUrl}/${req.url}`,
      params: params
    });

    return next(modifiedRequest);
  }
}


