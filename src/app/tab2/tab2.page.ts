import { Component, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { IonChip, IonItem, IonicModule, ModalController } from '@ionic/angular';
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
import { CreateCategoryComponent } from '../modals/create-category/create-category.component';
import { CreateTaskPage1Component } from '../modals/create-task-page1/create-task-page1.component';

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

  chosenTaskCategory: string = "Husholdning"; // by default! Question, should there not exist some defualt categories on first start up, or should users first create a category?

  @ViewChildren(IonChip, { read: ElementRef }) taskChips!: QueryList<ElementRef>;
  @ViewChildren(IonItem, { read: ElementRef }) taskItem!: QueryList<ElementRef>;

  constructor(private modalController: ModalController) {
   this.getAllTasks(); // this is the first thing we need to get
   this.getAllCategories();
  }

  async presentCreateCategoryModal() { // still a bunch of code just to use a object/component
    const modal = await this.modalController.create({  // we create a modal from the existing modal Component class so to say, you could switch out the component to create
      component: CreateCategoryComponent,
    });
      await modal.present(); 
  }

  async openTaskModal(){
    // hmm it opens both modals when opening them back and forth, are you not supposed to have more than one modal on a page? should you have multiple modal controllers? nope that didn't work
    const modal = await this.modalController.create({  // we create a modal from the existing modal Component class so to say, you could switch out the component to create
      component: CreateTaskPage1Component,
    });
      await modal.present(); 
  }

  // need to check the timestamp and all that, though maybe that should be checked in a service
  // need to check if a task_done with the specific task_id has a date equal to today to know weather or not the task has been completed

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

    // dude I'm so confused how to do this
    this.toggleCheckBoxes();
  }

  choseTaskCategory(taskTitle: string){      // not very efficient
    
    // all the boxes get's reset when chosing a new category
    this.currentCategoryTasks.splice(0); // clear array
    this.chosenTaskCategory = taskTitle; 

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
    const taskItems = this.taskItem.toArray();
    for (let i = 0; i < taskItems.length; i++) {
      let el = taskItems[i].nativeElement;
      if (el.children[0].checked === true) { 
        el.children[1].children[1].classList.add('hideDescription');  // sigh what a big mess of code
        el.classList.add('checkmarkButtonChecked'); 
      }
      else{
        el.children[1].children[1].classList.remove('hideDescription'); 
        el.classList.remove('checkmarkButtonChecked');
      } 
    }
  }

  toggleChip(chipValue: string) {
    const chipsArray = this.taskChips.toArray();
    for (let i = 0; i < chipsArray.length; i++) {
      if (chipsArray[i].nativeElement.innerText === chipValue) {
        chipsArray[i].nativeElement.classList.toggle('chosen');
        continue;
      }
      else chipsArray[i].nativeElement.classList.remove('chosen');
    }
  }

}
