import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private apiUrl = 'http://localhost:3000/api/likes';

  constructor(private http: HttpClient) { }

  addToLikes(destination: any): Observable<any> {
    return this.http.post(this.apiUrl, destination);
  }

  getLikes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
