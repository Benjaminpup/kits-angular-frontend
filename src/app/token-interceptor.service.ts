import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  tokenizedReq: any;
  public role: any;
  constructor(private route: ActivatedRoute, 
    private messageService: MessageService, private http: HttpClient, private router: Router
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Pass requests through WITHOUT adding Authorization header
    // Our CAP backend handles auth via custom Express routes (server.js),
    // not via standard Bearer token auth.
    return next.handle(req)
      .pipe(
        tap((res) => {
          if (res instanceof HttpResponse && res.status === 200) {
          }
        }),
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              sessionStorage.clear()
              this.router.navigate(['/login'])
            }
            // Safely show error message if available
            if (err.error && err.error.message) {
              this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
            }
          }

          return throwError(err);
        }),
        finalize(() => {
        }),
      );
  }

}