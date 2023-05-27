import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CreateTaskPage2Component } from '../create-task-page2/create-task-page2.component';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-create-task-page1',
  templateUrl: './create-task-page1.component.html',
  styleUrls: ['./create-task-page1.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class CreateTaskPage1Component  implements OnInit {

  createForm!: FormGroup; 

  constructor(private formBuilder: FormBuilder, private dbService: DatabaseService, private modalController: ModalController) { }

  ngOnInit(){
    this.createForm = this.formBuilder.group({
      Title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      Description: ['', [Validators.maxLength(100)]]
    });
  }

  async presentCreateTaskPage2Modal() { // still a bunch of code just to use a object/component
    const modal = await this.modalController.create({  // we create a modal from the existing modal Component class so to say, you could switch out the component to create
      component: CreateTaskPage2Component,
    });
      await modal.present(); 
  }
  
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  openNextTaskModal(){ 
    this.dbService.createTask.title = this.createForm.value.Title;
    this.dbService.createTask.description = this.createForm.value.Description;
    this.dbService.createTask.category_id = this.createForm.value.Category;
    this.presentCreateTaskPage2Modal();
    //console.log(this.createForm.value);
  }

  async cancel(){
    await this.modalController.dismiss();
  }

}
