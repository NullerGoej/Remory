import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-task-page3',
  templateUrl: './create-task-page3.component.html',
  styleUrls: ['./create-task-page3.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class CreateTaskPage3Component  implements OnInit {

  createForm!: FormGroup; 

  constructor(private formBuilder: FormBuilder, private modalController: ModalController) {}

  ngOnInit(){
    this.createForm = this.formBuilder.group({
      GPS: ['', [Validators.required]],
    });
  }

  finishTaskModal(){
    
  }
  
  async cancel(){
    await this.modalController.dismiss();
  }
}
