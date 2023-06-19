import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user';
=======
import { UserService } from './user.service';
import { User } from '../models/user';
import { Task } from '../models/task';
import { ModalController } from '@ionic/angular';
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

<<<<<<< HEAD
  loggedInUSer!: User;
  tasks: any[] = [];

  constructor(private taskService: TaskService, private userService: UserService, private router: Router) {
    //this.getAllData();
    //this.getAllTasks();
=======
  createTask: Task = new Task();

  loggedInUSer: User = new User();
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private userService: UserService) {
    //this.getAllData();
    //this.getAllTasks();
    this.loggedInUSer.user_id = 1; // cheating
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
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
<<<<<<< HEAD
    this.taskService.getAll()
=======
    this.taskService.getAllToday()
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
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
