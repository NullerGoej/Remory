import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  tasks: any[] = [];

  constructor(private taskService: TaskService, private userService: UserService, private router: Router) {
    this.getAllData();
  }

  private getAllData(): void {
    this.taskService.getAll()
      .subscribe(
        data => {
          console.log("in subscription");
          console.log(data);
          this.tasks = data;
        },
        error => {
          console.log(error);
        });
  }

  getAllTasks(): any[] {
    console.log("in getAllTasks");
          console.log(this.tasks);
    return this.tasks;
  }
}
