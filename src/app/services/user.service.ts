import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

<<<<<<< HEAD
const baseUrl = 'http://moedekjaer.dk:8080/api/users';
=======
const baseUrl = 'https://moedekjaer.dk:8443/api/users';
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  } 

  get(id: number): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  create(data: User): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: number, data: User): Observable<any> {
    console.log(data)
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
