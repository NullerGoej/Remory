<<<<<<< HEAD
import { Component, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { CheckboxChangeEventDetail, IonCheckbox, IonChip, IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { Task } from '../interfaces/task';
import { RouterModule } from '@angular/router';
=======
import { Component, ElementRef, NgZone, QueryList, ViewChildren, inject } from '@angular/core';
import { IonChip, IonItem, IonicModule, ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { Task } from '../interfaces/task';
import { Router, RouterModule } from '@angular/router';
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
import { DatabaseService } from '../services/database.service';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { TaskDoneService } from '../services/task_done.service.';
import { TaskDone } from '../models/task_done';
<<<<<<< HEAD
=======
import { CreateCategoryComponent } from '../modals/create-category/create-category.component';
import { CreateTaskPage1Component } from '../modals/create-task-page1/create-task-page1.component';
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, ExploreContainerComponent]
})
export class Tab2Page {

<<<<<<< HEAD
=======
  today: Date = new Date();
  chosenCategory: string = "Husholdning"; 

>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
  dbService: DatabaseService = inject(DatabaseService);
  taskService: TaskService = inject(TaskService);
  taskDoneService: TaskDoneService = inject(TaskDoneService);
  categoryService: CategoryService = inject(CategoryService);

  tasks: Task[] = [];
  currentCategoryTasks: Task[] = [];
  categories: Category[] = [];

<<<<<<< HEAD
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
=======
  @ViewChildren(IonChip, { read: ElementRef }) taskChips!: QueryList<ElementRef>;
  @ViewChildren(IonItem, { read: ElementRef }) taskItem!: QueryList<ElementRef>;

  constructor(private modalController: ModalController, private router: Router) { // shift + alt + f to format in vs code
   this.getAllTasks(); // this is the first thing we need to get
   this.getAllCategories();
   setInterval(() => { this.updateTime() }, 1000 * 60);
  }

  updateTime(){ // update the task list every minute
    this.today = new Date();
    //this.getAllTasks(); // this add more task to the existing ones, no good
  }

  pageInfoClicked(task: Task){
    this.router.navigate(["tabs/tab2/task-info/" + JSON.stringify(task)]);
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

  fixTime(date: Date){  // don't understand why it can't use the date pipe
    let d = date.toString();
    return d.slice(0, d.length -3);
  }

  // need to check if a task_done with the specific task_id has a date equal to today to know weather or not the task has been completed

  async getAllTasks(): Promise<void> { // it doesn't display all of them
    this.taskService.getAllToday().subscribe((data: any) => {
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
      this.tasks = data;
      for (let i = 0; i < this.tasks.length; i++) { // danm object reference
        this.currentCategoryTasks.push(this.tasks[i]);   
      }
    });
  }

<<<<<<< HEAD
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
=======
  async getAllCategories(): Promise<void> {
    let cat = new Category();
    cat.title = "All";
    this.categoryService.getAllByUserId(this.dbService.getLoggedInUser().user_id).subscribe((data: any) => { 
      this.categories = data; 
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
      this.categories.splice(0,0, cat);
      this.categories.join();
    });
  }

<<<<<<< HEAD
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
=======
  // we have a list of categories, check
  // we have a list of all tasks, check
  // we create a temp list of tasks that have the given category, check

  // we check if that temp list of tasks has any of them being done
  // if yes we assign them a specific style
  // if no, it has it's default style

  ngAfterViewInit() {
    this.tasksStyling();
  }

  // loop function execute checkTasksDone() when tasks are loaded
  tasksStyling(){
    setTimeout(() => {
      if(this.taskItem.length == 0) {
        this.tasksStyling();
      } 
      else {
        this.checkTasksDone();
      } 
    }, 50);
  }

  async checkTasksDone(){
    // I have a list of tasks depending on the category
    // with that list i need to check weather they are done

    const taskItems = this.taskItem.toArray();
  
      for (let i = 0; i < this.currentCategoryTasks.length; i++){
        for (let j = 0; j < this.tasks.length; j++){

          if(this.currentCategoryTasks[i].task_id == this.tasks[j].task_id){
            // we have a task and it's task done id
            // we need to check if the timestamp of task_done is equal to todays date, if yes, the task is done
            
            // a task will also return all it's associated task_done, in a list
          
            let td = this.tasks[j].task_dones;
            for (let x = 0; x < td.length; x++) {
              // if we find one with a date of today, that task has been done and should be true
                let el = taskItems[i].nativeElement;
                el.children[1].children[1].classList.add('hideDescription');  
                el.classList.add('checkmarkButtonChecked'); 
                // we got the value we wanted for this task, go next
                break;
              } 
            }
          }
        }
      }

  checkOfTask(task: any, e: any){
    //alert(JSON.stringify(task));

    // we post a task done object
    if(e.target.checked){
      let taskDone = new TaskDone(task.task_id);
      this.taskDoneService.create(taskDone).subscribe((data: any) => {
        let d = data;
      }); 
    }
    this.deleteExistingTaskDone(task.task_id);
    this.toggleCheckBoxes();
  }

  deleteExistingTaskDone(id: number){
    this.taskDoneService.deleteTaskDone24Hours(id).subscribe((data: any) => {
      let d = data;
    }); 
  }

  choseCategory(categoryTitle: string){      // not very efficient
    
    // all the boxes get's reset when chosing a new category

    this.currentCategoryTasks.splice(0); // clear array
    this.chosenCategory = categoryTitle; 

    // we make the list of tasks with the chosen category
    if(categoryTitle == "All") {
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
      for (var i = 0; i < this.tasks.length; i++){
        this.currentCategoryTasks.push(this.tasks[i]);
      }
    }
    else{
      for (var i = 0; i < this.tasks.length; i++){
<<<<<<< HEAD
        if(this.getCategoryNameFromTaskCategoryId(this.tasks[i].category_id) == taskTitle) this.currentCategoryTasks.push(this.tasks[i]);
      }
    }
    this.toggleChip(taskTitle);
=======
        if(this.getCategoryNameFromTaskCategoryId(this.tasks[i].category_id) == categoryTitle) this.currentCategoryTasks.push(this.tasks[i]);
      }
    }
    this.checkTasksDone();
    this.toggleChip(categoryTitle); // we highlight the chosen category chip
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
  }

  getCategoryNameFromTaskCategoryId(id: number): string{
      for (let i = 0; i < this.categories.length; i++) {
        if(this.categories[i].category_id == id) 
          return this.categories[i].title; 
      }
      return "All";
  }

<<<<<<< HEAD
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
=======
  // how would you set them based on the list of taks from the database?
  toggleCheckBoxes(){ // you only select one, could you somehow just send the selected element?
    const taskItems = this.taskItem.toArray();
    for (let i = 0; i < taskItems.length; i++) {
      let el = taskItems[i].nativeElement;
      if (el.children[0].checked === true) { 
        el.children[1].children[1].classList.add('hideDescription');  // sigh what a big mess of code
        el.children[2].classList.add('hideDescription');  
        el.classList.add('checkmarkButtonChecked'); 
      }
      else{
        el.children[1].children[1].classList.remove('hideDescription'); 
        el.children[2].classList.remove('hideDescription');  
        el.classList.remove('checkmarkButtonChecked');
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
      } 
    }
  }

  toggleChip(chipValue: string) {
    const chipsArray = this.taskChips.toArray();
    for (let i = 0; i < chipsArray.length; i++) {
      if (chipsArray[i].nativeElement.innerText === chipValue) {
        chipsArray[i].nativeElement.classList.toggle('chosen');
        continue;
<<<<<<< HEAD
          // now how do we change it's color?
=======
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
      }
      else chipsArray[i].nativeElement.classList.remove('chosen');
    }
  }

}
