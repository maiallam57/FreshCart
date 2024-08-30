import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly _httpClient = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl + environment.category}`)
  }

  getSpecificCategory(id: string): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl + environment.category}/${id}`)
  }
}
