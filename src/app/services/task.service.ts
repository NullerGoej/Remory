import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

const baseUrl = 'https://moedekjaer.dk:8443/api/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(baseUrl);
  }

  getAllToday(): Observable<Task[]> {
    return this.http.get<Task[]>(baseUrl + "/today");
  }

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
