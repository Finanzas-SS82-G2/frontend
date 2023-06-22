import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { InputData } from '../model/input-data';

@Injectable({
  providedIn: 'root'
})
export class ServiceInputDataService {

  baseUrl: string = 'https://finanzasapi.azurewebsites.net/api/v1/input-information';

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


  getInputInformationByConsultationId(id: number): Observable<InputData[]> {
    return this.http
      .get<InputData[]>(this.baseUrl + '/user/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  postInputInformation(inputInformation: InputData, consulId: number): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '/' + consulId, JSON.stringify(inputInformation), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllInputInformation(): Observable<InputData[]> {
    return this.http
      .get<InputData[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

}
