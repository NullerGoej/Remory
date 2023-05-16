import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private taskService: TaskService, private userService: UserService, private router: Router) {
  }
}
