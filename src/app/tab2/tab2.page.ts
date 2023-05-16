import { Component, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { IonChip, IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { Task } from '../interfaces/task';
import { RouterModule } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, ExploreContainerComponent]
})
export class Tab2Page {

  dbService: DatabaseService = inject(DatabaseService);
  taskService: TaskService = inject(TaskService);
  categoryService: CategoryService = inject(CategoryService);

  tasks: Task[] = [];
  categories: Category[] = [];

  categoryNames: string[] = ["All", "Husholdning", "Handlinger", "Løse ting"]; // really only need the names
  chosenTaskType: string = "Husholdning";

  @ViewChildren(IonChip, { read: ElementRef }) taskChips!: QueryList<ElementRef>;

  currentCategoryTasks: Task[] = [];

  constructor() {
   this.getAllTasks(); // this is the first thing we need to get
   this.getAllCategories();
  }

  getAllTasks(): void {
    this.taskService.getAll().subscribe((data: any) => {
      this.tasks = data;
      for (let i = 0; i < this.tasks.length; i++) { // danm object reference
        this.currentCategoryTasks.push(this.tasks[i]);   
      }
    });
  }

  getAllCategories(): void {
    let cat = new Category();
    cat.title = "All";
    this.categoryService.getAll().subscribe((data: any) => { 
      this.categories = data; // TODO, only get the categories for that user!!
      this.categories.splice(0,0, cat);
      this.categories.join();
    });
  }

  choseTaskType(task: string){ 
    // not very efficient
    // suppose for each task type the user has you would cache a list for each one and simply switch out the list, and not redo the filtering of the list
    console.log("Calling choseTaskType");
    this.currentCategoryTasks.splice(0); // clear array
    this.chosenTaskType = task; 

    if(task == "All") {
      for (var i = 0; i < this.tasks.length; i++){
        this.currentCategoryTasks.push(this.tasks[i]);
      }
    }
    else{
      for (var i = 0; i < this.tasks.length; i++){
        console.log("Pushing to list");
        console.log(this.tasks[i].title);
        console.log(task);
        if(this.getCategoryNameFromTaskCategoryId(this.tasks[i].category_id) == task) this.currentCategoryTasks.push(this.tasks[i]);
      }
    }
    this.toggleChip(task);
  }

  getCategoryNameFromTaskCategoryId(id: number): string{

      for (let i = 0; i < this.categories.length; i++) {
        if(this.categories[i].category_id == id) {
          console.log("Found this");
          console.log(this.categories[i].title);
          return this.categories[i].title; 
        }
      }
      return "All";
  }

  toggleChip(chipValue: string) {
    console.log(chipValue);
    const chipsArray = this.taskChips.toArray();
    for (let i = 0; i < chipsArray.length; i++) {
      if (chipsArray[i].nativeElement.innerText === chipValue) {
        chipsArray[i].nativeElement.classList.toggle('chosen');
        //chipsArray[i].nativeElement.setElementStyle("background-color","black");
          // now how do we change it's color?
          
      }
      else chipsArray[i].nativeElement.classList.remove('chosen');
    }
  }

}
