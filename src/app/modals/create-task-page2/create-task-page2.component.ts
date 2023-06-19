import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, RangeCustomEvent } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CreateTaskPage3Component } from '../create-task-page3/create-task-page3.component';
import { RangeValue } from '@ionic/core';
import { DatabaseService } from 'src/app/services/database.service';
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95

@Component({
  selector: 'app-create-task-page2',
  templateUrl: './create-task-page2.component.html',
  styleUrls: ['./create-task-page2.component.scss'],
<<<<<<< HEAD
})
export class CreateTaskPage2Component  implements OnInit {

  constructor() { }

  ngOnInit() {}
=======
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class CreateTaskPage2Component  implements OnInit {

  sliderVal!: RangeValue;
  sliderText: string = "";
  createForm!: FormGroup;
  lastClick: number = 0;

  constructor(private formBuilder: FormBuilder, private dbService: DatabaseService, private modalController: ModalController) {}
  
  ngOnInit(){
    this.createForm = this.formBuilder.group({
      Time: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      Repeat: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      StartDate: ['', [Validators.required]],
      Reminder: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      Monday: [false],
      Tuesday: [false],
      Wednesday: [false],
      Thursday: [false],
      Friday: [false],
      Saturday: [false],
      Sunday: [false]
    });

    // console.log("Page2 writing task object");
    // console.log(JSON.stringify(this.dbService.createTask));
  }

  async presentCreateTaskPage3Modal() { 
    const modal = await this.modalController.create({ 
      component: CreateTaskPage3Component,
    });
    await modal.present(); 
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
    const moment = require('moment');
    this.dbService.createTask.time = this.createForm.value.Time;
    if (this.createForm.value.Time == "") {
      this.dbService.createTask.time = moment().format('YYYY-MM-DD 23:59');
    }
    this.dbService.createTask.repeat = this.createForm.value.Repeat;
    this.dbService.createTask.start_date = this.createForm.value.StartDate;
    if (this.createForm.value.StartDate == "") {
      this.dbService.createTask.start_date = moment().format();
    }
    this.dbService.createTask.reminder = this.createForm.value.Reminder;
    let days: number[] = [];
    if(this.createForm.value.Monday){
      days.push(1);
    }
    if(this.createForm.value.Tuesday){
      days.push(2);
    }
    if(this.createForm.value.Wednesday){
      days.push(3);
    }
    if(this.createForm.value.Thursday){
      days.push(4);
    }
    if(this.createForm.value.Friday){
      days.push(5);
    }
    if(this.createForm.value.Saturday){
      days.push(6);
    }
    if(this.createForm.value.Sunday){
      days.push(7);
    }
    this.dbService.createTask.repeat = days.toString();
    this.presentCreateTaskPage3Modal();
  }

  async cancel(){
    await this.modalController.dismiss();
  }

  toggleSpan(span: string){
    if(this.lastClick % 2 == 0){
      let element = document.getElementById(span);
      element?.classList.toggle("task-checked");
    }
    this.lastClick++;
  }
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95

}
