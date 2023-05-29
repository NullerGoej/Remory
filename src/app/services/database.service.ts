import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { UserService } from './user.service';
import { User } from '../models/user';
import { Task } from '../models/task';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  createTask: Task = new Task();

  loggedInUSer: User = new User();
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private userService: UserService) {
    //this.getAllData();
    //this.getAllTasks();
    this.loggedInUSer.user_id = 1; // cheating
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
    this.taskService.getAllToday()
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
