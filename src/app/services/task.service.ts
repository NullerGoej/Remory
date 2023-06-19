import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

<<<<<<< HEAD
const baseUrl = 'http://moedekjaer.dk:8080/api/tasks';
=======
const baseUrl = 'https://moedekjaer.dk:8443/api/tasks';
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(baseUrl);
  }

<<<<<<< HEAD
=======
  getAllToday(): Observable<Task[]> {
    return this.http.get<Task[]>(baseUrl + "/today");
  }

>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
  get(id: number): Observable<Task> {
    return this.http.get<Task>(`${baseUrl}/${id}`);
  }

  create(data: Task): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: number, data: Task): Observable<any> {
    console.log(data)
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
