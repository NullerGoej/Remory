import { Component, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { CheckboxChangeEventDetail, IonCheckbox, IonChip, IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { Task } from '../interfaces/task';
import { RouterModule } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { TaskDoneService } from '../services/task_done.service.';
import { TaskDone } from '../models/task_done';

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
  taskDoneService: TaskDoneService = inject(TaskDoneService);
  categoryService: CategoryService = inject(CategoryService);

  tasks: Task[] = [];
  currentCategoryTasks: Task[] = [];
  categories: Category[] = [];

  chosenTaskType: string = "Husholdning";

  @ViewChildren(IonChip, { read: ElementRef }) taskChips!: QueryList<ElementRef>;
  @ViewChildren(IonCheckbox, { read: ElementRef }) taskCheckBoxes!: QueryList<ElementRef>;

  constructor() {
   this.getAllTasks(); // this is the first thing we need to get
   this.getAllCategories();
  }

  // need to be able to make check marks and have the red dot if not checked
  // oh and also we need to check the timestamp and all that, though maybe that should be checked in a service
  // like hey is it a new day? then we need to reset all the tasks that needs to be reset that day

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

      // you should be able to do that with the api route and param
      //for now though

      for (let i = 0; i < this.categories.length; i++) {
        if(this.categories[i].user_id != this.dbService.getLoggedInUser().user_id) {
          this.categories.splice(i, 1);
        }
      }
      this.categories.splice(0,0, cat);
      this.categories.join();
    });
  }

  checkOfTask(task: any){
    //alert(JSON.stringify(task));
    // what if you check it on and then check it of again?
    // you should send it when you're sure they are done, with sync
    // there should not be more than one task done in one day!
    // does the database check that? it could right?  

    // we post a task done object
    let taskDone = new TaskDone(Date.now().toString(), task.task_id);
    // this.taskDoneService.create(taskDone).subscribe((data: any) => {
    //   //get error message at the very least!
    // }); 

    // when it is checked off, then we change it's color and whatnot
    // the page needs to know which ones of the tasks are checked off, hmm
    // I then need a list of booleans that corresponds to the tasks? ARGH


    // dude I'm so confused how to do this
    this.toggleCheckBoxes();
  }

  choseTaskType(taskTitle: string){ 
    // not very efficient
    // suppose for each task type the user has you would cache a list for each one and simply switch out the list, and not redo the filtering of the list
    this.currentCategoryTasks.splice(0); // clear array
    this.chosenTaskType = taskTitle; 

    if(taskTitle == "All") {
      for (var i = 0; i < this.tasks.length; i++){
        this.currentCategoryTasks.push(this.tasks[i]);
      }
    }
    else{
      for (var i = 0; i < this.tasks.length; i++){
        if(this.getCategoryNameFromTaskCategoryId(this.tasks[i].category_id) == taskTitle) this.currentCategoryTasks.push(this.tasks[i]);
      }
    }
    this.toggleChip(taskTitle);
  }

  getCategoryNameFromTaskCategoryId(id: number): string{
      for (let i = 0; i < this.categories.length; i++) {
        if(this.categories[i].category_id == id) 
          return this.categories[i].title; 
      }
      return "All";
  }

  toggleCheckBoxes(){ // you only select one, could you somehow just send the selected element?
    const chipsArray = this.taskCheckBoxes.toArray();
    for (let i = 0; i < chipsArray.length; i++) {
      if (chipsArray[i].nativeElement.checked == true) {
        //console.log("We set checkBox to checkmark on")
        chipsArray[i].nativeElement.classList.toggle('checkmarkButtonChecked'); // it doesn't seem to change the style
      }
      else{
        //console.log("We set checkBox to checkmark off")
        chipsArray[i].nativeElement.classList.remove('checkmarkButtonChecked');
      } 
    }
  }

  toggleChip(chipValue: string) {
    const chipsArray = this.taskChips.toArray();
    for (let i = 0; i < chipsArray.length; i++) {
      if (chipsArray[i].nativeElement.innerText === chipValue) {
        chipsArray[i].nativeElement.classList.toggle('chosen');
        continue;
          // now how do we change it's color?
      }
      else chipsArray[i].nativeElement.classList.remove('chosen');
    }
  }

}
