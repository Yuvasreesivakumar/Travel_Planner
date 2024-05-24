import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Destination } from './destinationmodule';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DestinationServiceService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getFeaturedDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/destinations`).pipe(
      catchError(this.handleError)
    );
  }

  getDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/destinations`).pipe(
      catchError(this.handleError)
    );
  }

  getDestinationById(id: number): Observable<Destination> {
    return this.http.get<Destination>(`${this.apiUrl}/destination/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.status === 200) {
        errorMessage = 'Received unexpected response format';
      }
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
