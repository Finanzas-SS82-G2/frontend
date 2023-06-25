import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Consultation } from '../model/consultation';

@Injectable({
  providedIn: 'root'
})
export class ServiceConsultationService {

  baseUrl: string = 'https://finanzasapi.azurewebsites.net/api/v1/consultations';

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


  getConsultationByUserId(id: number): Observable<Consultation[]> {
    return this.http
      .get<Consultation[]>(this.baseUrl + '/user/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  getConsultationById(id: number): Observable<Consultation> {
    return this.http
      .get<Consultation>(this.baseUrl + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllConsultation(): Observable<Consultation[]> {
    return this.http
      .get<Consultation[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  postConsultation(consultation: Consultation, userId: number): Observable<Consultation> {
    return this.http
      .post<Consultation>(this.baseUrl + '/' + userId, JSON.stringify(consultation), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
