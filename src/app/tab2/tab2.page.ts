import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { IonChip, IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { Task } from '../interfaces/task';
import { RouterModule } from '@angular/router';

export enum taskType { 
 // wait how do you do this if the user can create their own task type?
 //
 // Suppose you would have a string with "," that seperates types and you check which of these types are chosen
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, ExploreContainerComponent]
})
export class Tab2Page {

  taskTypes: string[] = ["All", "Husholdning", "Handlinger", "Løse ting"];
  chosenTaskType: string = "Husholdning";

  @ViewChildren(IonChip, { read: ElementRef }) taskChips!: QueryList<ElementRef>;

  currentTypeTasks: Task[] = [];

  // dummy data
  private tasks: Task[] = [{ // only display the ones with the chosen type
    "TaskId": 1,
    "Title": "Clean",
    "Description": "the roof",
    "Time": "10-10-2023",
    "StartDate": "10-10-2023",
    "Repeat": "1,2",
    "Reminder": 5,
    "Gps": "longitude: 15, latitude: 10",
    "UserId": 1,
    "Type": "Husholdning"
  },
  {
    "TaskId": 2,
    "Title": "Clean",
    "Description": "the kitchen",
    "Time": "10-10-2023",
    "StartDate": "10-10-2023",
    "Repeat": "1,2",
    "Reminder": 5,
    "Gps": "longitude: 15, latitude: 10",
    "UserId": 2,
    "Type": "Husholdning"
  },
  {
    "TaskId": 3,
    "Title": "Exercise",
    "Description": "Go outside",
    "Time": "10-10-2023",
    "StartDate": "10-10-2023",
    "Repeat": "1,2",
    "Reminder": 5,
    "Gps": "longitude: 15, latitude: 10",
    "UserId": 2,
    "Type": "Handlinger"
  },
]; 

  constructor() {
  }

  ngAfterViewInit(): void {
    this.currentTypeTasks = this.choseTaskType(this.chosenTaskType); // the view with chips has to load before we can work with the data
  }

  choseTaskType(taskType: string){ 
    // not very efficient
    // suppose for each task type the user has you would cache a list for each one and simply switch out the list, and not redo the filtering of the list

    this.currentTypeTasks.splice(0); // clear array
    this.chosenTaskType = taskType;

    if(taskType == "All") {
      //this.currentTypeTasks = this.tasks; // why wont this work?
      for (var i = 0; i < this.tasks.length; i++){
        this.currentTypeTasks.push(this.tasks[i]);
      }
    }
    else{
      for (var i = 0; i < this.tasks.length; i++){
        if(this.tasks[i].Type == taskType) this.currentTypeTasks.push(this.tasks[i]);
      }
    }
    this.toggleChip(taskType);
    return this.currentTypeTasks;
  }

  toggleChip(chipValue: string) {
    const chipsArray = this.taskChips.toArray();
    for (let i = 0; i < chipsArray.length; i++) {
      if (chipsArray[i].nativeElement.innerText === chipValue) {
        chipsArray[i].nativeElement.classList.toggle('chosen');
        chipsArray[i].nativeElement.setElementStyle("background-color","black");
          // now how do we change it's color?
          
      }
      else chipsArray[i].nativeElement.classList.remove('chosen');
    }
  }

}
