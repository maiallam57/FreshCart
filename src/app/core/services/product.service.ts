import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _httpClient = inject(HttpClient);

  getAllProducts(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl + environment.products}`)
  }

  getSpecificProducts(id: string | null): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl + environment.products}/${id}`)
  }
}
