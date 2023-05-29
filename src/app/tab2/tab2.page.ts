import { Component, ElementRef, NgZone, QueryList, ViewChildren, inject } from '@angular/core';
import { IonChip, IonItem, IonicModule, ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { Task } from '../interfaces/task';
import { Router, RouterModule } from '@angular/router';
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
  currentCategoryTasks: Task[] = [];
  categories: Category[] = [];

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
      this.tasks = data;
      for (let i = 0; i < this.tasks.length; i++) { // danm object reference
        this.currentCategoryTasks.push(this.tasks[i]);   
      }
    });
  }

  async getAllCategories(): Promise<void> {
    let cat = new Category();
    cat.title = "All";
    this.categoryService.getAllByUserId(this.dbService.getLoggedInUser().user_id).subscribe((data: any) => { 
      this.categories = data; 
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

  ngAfterViewInit() {
    this.tasksStyling();
  }

  // loop function execute checkTasksDone() when tasks are loaded
  tasksStyling(){
    setTimeout(() => {
      console.log(this.taskItem.length);
      if(this.taskItem.length == 0) {
        this.tasksStyling();
      } 
      else {
        this.checkTasksDone();
      } 
    }, 1000);
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

  checkOfTask(task: any){
    //alert(JSON.stringify(task));

    // we post a task done object
    let taskDone = new TaskDone(new Date(), task.task_id); // the database sets the date, can't leave timestamp null thouugh
    console.log(JSON.stringify(taskDone)); // the object is identical to the one I send with postman, yet it throws an error when posting it from here
    this.taskDoneService.create(taskDone).subscribe((data: any) => {
      //get error message at the very least!
      let d = data;
    }); 

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
        el.children[2].classList.add('hideDescription');  
        el.classList.add('checkmarkButtonChecked'); 
      }
      else{
        el.children[1].children[1].classList.remove('hideDescription'); 
        el.children[2].classList.remove('hideDescription');  
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
