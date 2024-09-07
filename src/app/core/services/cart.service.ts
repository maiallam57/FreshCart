import { environment } from './../environment/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _httpClient = inject(HttpClient)

  header: any = { token: localStorage.getItem(environment.token) };

  addProductToCart(id: string): Observable<any> {
    return this._httpClient.post(environment.baseUrl + environment.cart,
      {
        "productId": id
      },
      {
        headers: this.header
      });
  }

  updateProductQuantity(quantity: string): Observable<any> {
    return this._httpClient.put(environment.baseUrl + environment.cart,
      {
        "count": quantity
      },
      {
        headers: this.header
      });
  }

  getUserCart(): Observable<any> {
    return this._httpClient.get(environment.baseUrl + environment.cart,
      {
        headers: this.header
      });
  }

  removeCartItem(id: string): Observable<any> {
    return this._httpClient.delete(environment.baseUrl + environment.cart + `/${id}`,
      {
        headers: this.header
      });
  }

  clearCart(): Observable<any> {
    return this._httpClient.delete(environment.baseUrl + environment.cart,
      {
        headers: this.header
      });
  }
}
