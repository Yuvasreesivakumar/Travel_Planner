import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) { }

  addToCart(destination: any): Observable<any> {
    return this.http.post(this.apiUrl, destination);
  }

  getCart(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateCart(items: any[]): Observable<any> {
    return this.http.put<any>(this.apiUrl, items);
  }

  removeFromCart(item: any): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/${item.id}`);
  }

}
