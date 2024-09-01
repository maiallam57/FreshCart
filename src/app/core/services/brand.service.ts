import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private readonly _httpClient = inject(HttpClient);

  getAllBrands(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl + environment.brand}`)
  }

  getSpecificBrand(id: string): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl + environment.brand}/${id}`)
  }
}
