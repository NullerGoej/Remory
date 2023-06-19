import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskDone } from '../models/task_done';

<<<<<<< HEAD
const baseUrl = 'http://moedekjaer.dk:8080/api/tasks';
=======
const baseUrl = 'https://moedekjaer.dk:8443/api/tasks_done';
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95

@Injectable({
  providedIn: 'root'
})
export class TaskDoneService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TaskDone[]> {
    return this.http.get<TaskDone[]>(baseUrl);
  }

  get(id: number): Observable<TaskDone> {
    return this.http.get<TaskDone>(`${baseUrl}/${id}`);
  }
<<<<<<< HEAD

  create(data: TaskDone): Observable<any> {
    return this.http.post(baseUrl, data);
  }

=======
 
  create(data: TaskDone): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
  update(id: number, data: TaskDone): Observable<any> {
    console.log(data)
    return this.http.put(`${baseUrl}/${id}`, data);
  }
<<<<<<< HEAD

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
=======
  
  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteTaskDone24Hours(id: number){
    return this.http.delete<TaskDone>(`${baseUrl}/24h/${id}`);
  }
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
}
