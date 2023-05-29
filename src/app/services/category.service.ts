import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

const baseUrl = 'https://moedekjaer.dk:8443/api/Categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl);
  }

  getAllByUserId(id: number){
    return this.http.get<Category[]>(baseUrl + "?userid=" + id);
  }

  get(id: number): Observable<Category> {
    return this.http.get<Category>(`${baseUrl}/${id}`);
  }

  create(data: Category): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: number, data: Category): Observable<any> {
    console.log(data)
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
