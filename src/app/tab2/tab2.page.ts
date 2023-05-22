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

  today: Date = new Date();
  chosenCategory: string = "Husholdning"; 

  dbService: DatabaseService = inject(DatabaseService);
  taskService: TaskService = inject(TaskService);
  taskDoneService: TaskDoneService = inject(TaskDoneService);
  categoryService: CategoryService = inject(CategoryService);

  tasks: Task[] = [];
  tasks_dones: TaskDone[] = []; 
  currentCategoryTasks: Task[] = [];
  categories: Category[] = [];

  @ViewChildren(IonChip, { read: ElementRef }) taskChips!: QueryList<ElementRef>;
  @ViewChildren(IonItem, { read: ElementRef }) taskItem!: QueryList<ElementRef>;

  constructor(private modalController: ModalController) { // shift + alt + f to format in vs code
   this.getAllTasks(); // this is the first thing we need to get
   this.getAllCategories();
   setInterval(this.updateTime, 1000 * 60,); // every minute

    let d = new Date();
    d.setDate(d.getDate() + 1)

   this.checkDate(d);
  }

  updateTime(){
    this.today = new Date(); // then call and check if there are new tasks
    this.getAllTasks();
  }

  async presentCreateCategoryModal() { // still a bunch of code just to use a object/component
    const modal = await this.modalController.create({  // we create a modal from the existing modal Component class so to say, you could switch out the component to create
      component: CreateCategoryComponent,
    });
      await modal.present(); 
  }

  async openTaskModal(){
    const modal = await this.modalController.create({  
      component: CreateTaskPage1Component,
    });
      await modal.present(); 
  }

  // need to check the timestamp and all that, though maybe that should be checked in a service
  // need to check if a task_done with the specific task_id has a date equal to today to know weather or not the task has been completed

  async getAllTasks(): Promise<void> {
    this.taskService.getAll().subscribe((data: any) => {
      this.tasks = data;
      for (let i = 0; i < this.tasks.length; i++) { // danm object reference
        this.currentCategoryTasks.push(this.tasks[i]);   
      }
    });
  }

  async getAllCategories(): Promise<void> {
    let cat = new Category();
    cat.title = "All";
    this.categoryService.getAll().subscribe((data: any) => { 
      this.categories = data; // TODO, only get the categories for that user!!

      // you should be able to do that with the api route and param
      // for now though

      for (let i = 0; i < this.categories.length; i++) {
        if(this.categories[i].user_id != this.dbService.getLoggedInUser().user_id) {
          this.categories.splice(i, 1);
        }
      }
      this.categories.splice(0,0, cat);
      this.categories.join();
    });
  }

  // we have a list of categories, check
  // we have a list of all tasks, check
  // we create a temp list of tasks that have the given category, check

  // we check if that temp list of tasks has any of them being done
  // if yes we assign them a specific style
  // if no, it has it's default style

  sortTasks(){
  
  }

  async checkTasksDone(){

    // I have a list of tasks depending on the category
    // with that list i need to check weather they are done

    const taskItems = this.taskItem.toArray();
    // we get a list of tasks
      await this.taskDoneService.getAll().subscribe((data: any) =>{
        this.tasks_dones = data; 
      });
      for (let i = 0; i < this.currentCategoryTasks.length; i++){
        for (let j = 0; j < this.tasks_dones.length; j++){

          if(this.currentCategoryTasks[i].task_id == this.tasks_dones[j].task_id){
            // we have a task and it's task done id
            if(this.checkDate(this.tasks_dones[j].timeStamp)){
              
              let el = taskItems[i].nativeElement;
              el.children[1].children[1].classList.add('hideDescription');  
              el.classList.add('checkmarkButtonChecked'); 
              // we got the value we wanted for this task, go next
              break;
            }
            // if we find one with a date of today, that task has been done and should be true
          }
        }
      }
    // we check them against task_done
    // we then assign them a on or off value
    // we then call toggleCheckboxes which will apply the style
  }

  checkDate(date: Date): boolean {
    //console.log(this.today.toDateString()); // toDateString writes the month in letters, aka useless
    var dateToday = this.today.getDate() + '/' + (this.today.getMonth()+1) + '/' + this.today.getFullYear(); // why isn't there a function for this?
    var checkDate = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear(); 


    var tommorowDateTime = new Date().getTime() + (1 * 24 * 60 * 60 * 1000); // 24 hours in the future
    var currentDateTime = date.getTime() + (1 * 24 * 60 * 60 * 1000);
                                     
    if (currentDateTime < tommorowDateTime) { // wait how do we also not get past ones?
      
    }

    if(checkDate == dateToday) return true; // well we need to check if it is within 24 hours of today
    return false;
  }

  checkOfTask(task: any){
    //alert(JSON.stringify(task));
    // what if you check it on and then check it of again?
    // you should send it when you're sure they are done, with sync
    // there should not be more than one task done in one day!
    // does the database check that? it could right?  

    // we post a task done object
    this.today.setDate(Date.now());
    let taskDone = new TaskDone(this.today, task.task_id);
    console.log(JSON.stringify(taskDone)); // the object is identical to the one I send with postman, yet it throws an error when posting it from here
    this.taskDoneService.create(taskDone).subscribe((data: any) => {
      //get error message at the very least!
      let d = data;
    }); 

    // dude I'm so confused how to do this
    this.toggleCheckBoxes();
  }

  choseCategory(categoryTitle: string){      // not very efficient
    
    // all the boxes get's reset when chosing a new category

    this.currentCategoryTasks.splice(0); // clear array
    this.chosenCategory = categoryTitle; 

    // we make the list of tasks with the chosen category
    if(categoryTitle == "All") {
      for (var i = 0; i < this.tasks.length; i++){
        this.currentCategoryTasks.push(this.tasks[i]);
      }
    }
    else{
      for (var i = 0; i < this.tasks.length; i++){
        if(this.getCategoryNameFromTaskCategoryId(this.tasks[i].category_id) == categoryTitle) this.currentCategoryTasks.push(this.tasks[i]);
      }
    }
    this.checkTasksDone();
    this.toggleChip(categoryTitle); // we highlight the chosen category chip
  }

  getCategoryNameFromTaskCategoryId(id: number): string{
      for (let i = 0; i < this.categories.length; i++) {
        if(this.categories[i].category_id == id) 
          return this.categories[i].title; 
      }
      return "All";
  }


  // how would you set them based on the list of taks from the database?
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
