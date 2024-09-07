import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly _httpClient = inject(HttpClient);

  header: any = { token: localStorage.getItem(environment.token) };

  getWishlist(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl + environment.wishlist}`,
      {
        headers: this.header
      }
    )
  }

  AddToWishlist(productId: string): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl + environment.wishlist}`,
      {
        "productId": productId
      },
      {
        headers: this.header
      }
    );
  }

  DelFromWishlist(productId: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl + environment.wishlist}/${productId}`,
      {
        headers: this.header
      }
    );
  }
}
