import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  message:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api'; // Base URL for your API
  private loggedIn: boolean = false;
  private username: string = '';

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap(response => {
        // If login successful, set loggedIn to true and username to the logged-in user's username
        if (response.message === 'Login successful') {
          this.loggedIn = true;
          this.username = username;
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUsername(): string {
    return this.username;
  }

  logout(): void {
    this.loggedIn = false;
    this.username = '';
  }
}
