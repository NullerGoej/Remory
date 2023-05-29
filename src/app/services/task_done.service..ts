import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskDone } from '../models/task_done';

const baseUrl = 'https://moedekjaer.dk:8443/api/tasks_done';

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
 
  create(data: TaskDone): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  
  update(id: number, data: TaskDone): Observable<any> {
    console.log(data)
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  
  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteTaskDone24Hours(id: number){
    return this.http.delete<TaskDone>(`${baseUrl}/24h/${id}`);
  }
}
