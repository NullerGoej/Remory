import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, RangeCustomEvent } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CreateTaskPage3Component } from '../create-task-page3/create-task-page3.component';
import { RangeValue } from '@ionic/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-task-page2',
  templateUrl: './create-task-page2.component.html',
  styleUrls: ['./create-task-page2.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class CreateTaskPage2Component  implements OnInit {

  categoryId: number = 0;
  categories: Category[] = [];
  sliderVal!: RangeValue;
  sliderText: string = "";
  createForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private dbService: DatabaseService, private modalController: ModalController) {}
  
  ngOnInit(){
    this.getAllCategories();
    this.createForm = this.formBuilder.group({
      Time: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      Repeat: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      StartDate: ['', [Validators.required]],
      Reminder: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
    });

    // console.log("Page2 writing task object");
    // console.log(JSON.stringify(this.dbService.createTask));
  }

  async presentCreateTaskPage3Modal() { // still a bunch of code just to use a object/component
    const modal = await this.modalController.create({  // we create a modal from the existing modal Component class so to say, you could switch out the component to create
      component: CreateTaskPage3Component,
    });
    await modal.present(); 
  }

  async getAllCategories(): Promise<void> {
    this.categoryService.getAllByUserId(this.dbService.getLoggedInUser().user_id).subscribe((data: any) => { 
      this.categories = data; 
    });
  }

  choseCategory(ev: any){
    this.categoryId = ev.target.value.category_id;
    //console.log(this.categoryId);
  }

  pinFormatter(value: number) {
    let v = "";
    switch (value) { // inside this func, can't call the switch statement, really nice, have to duplicate code...
      case 0:
        v = "none";
        break;
      case 1:
        v = "1 h";
        break;
      case 2:
        v =  "2 h";
        break;
      case 3:
        v =  "3 h";
        break;
      case 4:
        v =  "5 h";
        break;
      case 5:
        v = "10 h";
        break;
      case 6:
        v = "1 day";
        break;
      default:
        v = "1 h";
    }
    return `${v}`;
  }

  GetSlideVal(value: number){
    switch (value) {
      case 0:
        return"no reminder";
      case 1:
        return"1 hours";
      case 2:
        return "2 hours";
      case 3:
        return "3 hours";
      case 4:
        return "5 hours";
      case 5:
        return "10 hours";
      case 6:
        return "1 day";
      default:
        return "1 hour";
    }
  }

    onIonChange(ev: Event) {
    this.sliderVal = (ev as RangeCustomEvent).detail.value;
    this.sliderText = this.GetSlideVal(parseInt(this.sliderVal?.toString()))!;
  }

  openNextTaskModal(){
    this.dbService.createTask.time = this.createForm.value.Time;
    this.dbService.createTask.repeat = this.createForm.value.Repeat;
    this.dbService.createTask.start_date = this.createForm.value.StartDate;
    this.dbService.createTask.reminder = this.createForm.value.Reminder;
    this.dbService.createTask.category_id = this.categoryId;
    this.presentCreateTaskPage3Modal();
    //console.log(this.createForm.value);
  }

  async cancel(){
    await this.modalController.dismiss();
  }

}
