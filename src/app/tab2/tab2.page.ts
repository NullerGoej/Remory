import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ExploreContainerComponent,]
})
export class Tab2Page {

  tasks: Task[] = [{
    "TaskId": 1,
    "Title": "Clean",
    "Description": "the roof",
    "Time": "10-10-2023",
    "StartDate": "10-10-2023",
    "Repeat": "1,2",
    "Reminder": 5,
    "Gps": "longitude: 15, latitude: 10",
    "UserId": 1
  },
  {
    "TaskId": 2,
    "Title": "Clean",
    "Description": "the roof",
    "Time": "10-10-2023",
    "StartDate": "10-10-2023",
    "Repeat": "1,2",
    "Reminder": 5,
    "Gps": "longitude: 15, latitude: 10",
    "UserId": 1
  },
]; 

  constructor() {}



}
