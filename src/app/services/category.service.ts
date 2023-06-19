import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

<<<<<<< HEAD
const baseUrl = 'http://moedekjaer.dk:8080/api/Categories';
=======
const baseUrl = 'https://moedekjaer.dk:8443/api/Categories';
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl);
  }

<<<<<<< HEAD
=======
  getAllByUserId(id: number){
    return this.http.get<Category[]>(baseUrl + "?userid=" + id);
  }

>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
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
