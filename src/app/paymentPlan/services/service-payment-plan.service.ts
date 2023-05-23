import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PaymentPlan } from '../model/payment-plan';

@Injectable({
  providedIn: 'root'
})
export class ServicePaymentPlanService {

  baseUrl: string = 'https://finanzasrestfulapi.azurewebsites.net/api/payment-plan';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(
      'something happened with request, please try again later'
    );
  }

  getPaymentPlanById(id: number): Observable<PaymentPlan> {
    return this.http
      .get<PaymentPlan>(this.baseUrl + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllPaymentPlan(): Observable<PaymentPlan[]> {
    return this.http
      .get<PaymentPlan[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  postPaymentPlan(paymentPlan: PaymentPlan): Observable<PaymentPlan> {
    return this.http
      .post<PaymentPlan>(this.baseUrl, JSON.stringify(paymentPlan), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
