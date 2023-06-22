import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  baseUrl: string = 'https://finanzasapi.azurewebsites.net/api/v1/users';

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

  getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(this.baseUrl + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http
      .get<User>(this.baseUrl + '/searchByEmail/' + email)
      .pipe(retry(2), catchError(this.handleError));
  }

  postUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.baseUrl, JSON.stringify(user), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
