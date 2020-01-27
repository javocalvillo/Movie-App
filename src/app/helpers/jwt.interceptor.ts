import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private router: Router) { }
  //Identifica y maneja una solicitud HTTP dada.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODE0OTRjNjM1NWQzOTJhNDU4MmZhOGE4OWYzMzJhMCIsInN1YiI6IjVlMjMwNzNlY2Y0YjhiMDAxMmYzZWNjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kU8MLDOMXWna3gv_KVqDXQ5xsWh54wdg-etiLTc7zC4';
    req = req.clone({ //clona los encabezados del request
      setHeaders: {
        Authorization: `${token}`
      }
    });

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log(event);
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        }
      })
    );
  }
}
