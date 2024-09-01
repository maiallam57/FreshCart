import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly _httpClient = inject(HttpClient);

  getWishlist(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl + environment.wishlist}`)
  }

  AddToWishlist(productId: string): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl + environment.wishlist}`, productId);
  }

  DelFromWishlist(productId: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl + environment.wishlist}/${productId}`);
  }
}
