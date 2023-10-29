import { ToastrService } from 'ngx-toastr';

import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { finalize, mergeMap, retryWhen, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '../../models/user';
import { Router } from '@angular/router';
import { LoaderService } from '../app/loader.service';

import {catchError} from "rxjs/operators";

@Injectable()
export class Interceptor implements HttpInterceptor {
  
  user:       UserModel = {} as UserModel;
  token:      string = '';
  cartId:     string = '';
  favoriteId: string = '';
  
  private count = 0;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar,
    private loaderService: LoaderService,
  ) {}

  openSnackBar(message: any, delay: number = 8000, action ='') {
    return this._snackBar.open(message, action, {
      duration: 1 * delay,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    return from(
      Promise.all([
        // this.user = JSON.parse(localStorage.getItem("fullInfo") as string),
        this.token      = localStorage.getItem("token") as string,
        this.cartId     = localStorage.getItem("cartId") as string || '',
        this.favoriteId = localStorage.getItem("favoriteId") as string || '',
      ])
    ).pipe(
      switchMap((val) => {

        req = req.clone({
          headers: req.headers.set('accept', 'application/json'),
        });
        
        req = req.clone({
          headers: req.headers.set('AppLanguage', 'ar'),
        });
        
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + val[0]),
        });

        if (this.count === 0) {
          this.loaderService.startloaderState(true)
        }
        
        this.count++;
        
        return next.handle(req)
        .pipe(
          catchError((error: HttpErrorResponse) => {
             let errorMsg = '';

             if (error.error instanceof ErrorEvent) {
                errorMsg = `Error: ${error.error.message}`;
             } else {
             
                const status     = error.status;
                const content    = error.error;
                const msg        = content.message || '';
                const validation = content.errors;
                // ==============================================================>
               
                if (msg.length) {
                  this.toastr.error(msg)
                }

                if (content && content.message && content.message.includes('jwt expired')) {
                  localStorage.clear()
                  this.router.navigate(['/'])
                }

                if (status === 500) {
              
                  this.openSnackBar(content.message)
                } else if (status === 400 && !validation && msg) {
                  
                } else if (status === 400 && validation) {
                
                } else if (status === 401) {
                
                } else if (status === 404) {
                  
                } else {

                }
             }
             return throwError(error);
          })
        )
        .pipe(
          tap(event => {
            
           
          }),
          retryWhen(
            genericRetryStrategy({
              scalingDuration: 100,
              excludedStatusCodes: [500, 400, 200, 300],
            })
          ),
          // retryWhen((errors) => {
          //   // debugger

          //   return throwError(errors)
          //   // errors.pipe(

          //   //   mergeMap((error, index) => {
          //   //     const status     = error.status;
          //   //     const content    = error.error;
          //   //     const msg        = content.message || '';
          //   //     const validation = content.errors;
                
          //   //     this.openSnackBar(content.message)

          //   //     if (content && content.message && content.message.includes('jwt expired')) {
          //   //       localStorage.clear()
          //   //       this.router.navigate(['/systemlogin'])
          //   //     }

          //   //     if (status === 0) {
                  
          //   //         this.openSnackBar('مشكله في الاتصال بالانترنت')
             
          //   //         const retryAttempt = index + 1;

          //   //         if ( retryAttempt > 4000 ) {
          //   //           return throwError(error);
          //   //         }
          //   //         return timer(retryAttempt * 1000);

          //   //       // ==============================================================>
          //   //     } else if (status === 500) {
              
          //   //       // this.openSnackBar(content.message)
          //   //     } else if (status === 400 && !validation && msg) {
                  
          //   //     } else if (status === 400 && validation) {
                
          //   //     } else if (status === 401) {
                
          //   //     } else if (status === 404) {
                  
          //   //     } else {

          //   //     }
          //   //     finalize(() =>{
  
          //   //     })
          //   //     throw error;
          //   //   }),
          //   // );

          //   // throw errors;
          // }),
          finalize(() =>{
            this.count--;
            if (this.count === 0) {
              this.loaderService.startloaderState(false)
            }}
          )
        )
        
      })
    )
  }
}

export const genericRetryStrategy =
  ({
    maxRetryAttempts = 13000,
    scalingDuration = 1000,
    excludedStatusCodes = [],
  }: {
    maxRetryAttempts?: number;
    scalingDuration?: number;
    excludedStatusCodes?: number[];
  } = {}) =>
  (attempts: Observable<any>) =>
    attempts.pipe(
      mergeMap((error, i) => {
        if (error.status === 0) {
          const retryAttempt = i + 1;
          // if maximum number of retries have been met
          // or response is a status code we don't wish to retry, throw error
          if (
            retryAttempt > maxRetryAttempts ||
            excludedStatusCodes.find((e) => e === error.status)
          ) {
            return throwError(error);
          }
      
          // retry after 1s, 2s, etc...
          return timer(retryAttempt * scalingDuration);
        }
        return throwError(error);
      }),
      finalize(() => 
      {}
      )
    );

