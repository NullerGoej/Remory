import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  loggedInUSer!: User;
  tasks: Task[] = [];

  createTask: Task = new Task();

  constructor(private taskService: TaskService, private userService: UserService, private router: Router) {
    //this.getAllData();
    //this.getAllTasks();
    this.getUser(1) // get user with id 1
  }

  private getUser(id: number){
    this.userService.get(id)
      .subscribe(
        data => {
          console.log(data);
          this.loggedInUSer = data;
        },
        error => {
          console.log(error);
        });
  }

  private getAllData(): void {
    this.taskService.getAll()
      .subscribe(
        data => {
          console.log(data);
          this.tasks = data;
        },
        error => {
          console.log(error);
        });
  }

  getAllTasks(): any[] {
    console.log(this.tasks);
    return this.tasks;
  }

  getLoggedInUser(): User {
    if(this.loggedInUSer == undefined) {
      this.getUser(1);
    }
    return this.loggedInUSer;
  }

  getCheckMarkedTasks(){
    //task are done or something
  }
}
