import { Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonChip, IonModal, IonicModule, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class CreateCategoryComponent{

  changeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalController: ModalController) { 
    // we want to show all categories, we want to edit them, and create new ones and delete existing ones, kinda like the admin page in wannaGo
  }

  ngOnInit(){
    this.changeForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]]
    });
  }

  cancel(){
    this.modalController.dismiss();
  }

  createCategory(){

  }

}
