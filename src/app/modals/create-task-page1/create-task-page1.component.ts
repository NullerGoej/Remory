import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-task-page1',
  templateUrl: './create-task-page1.component.html',
  styleUrls: ['./create-task-page1.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class CreateTaskPage1Component  implements OnInit {

  // hmm now the form is on the modal. Will each modal have it's own formGroup? But then how do you combine and gather all the form groups into one
  createForm!: FormGroup; 

  constructor(private formBuilder: FormBuilder, private modalController: ModalController) { }

  ngOnInit(){
    this.createForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]]
    });
  }
  
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  cancel(){
    this.modalController.dismiss();
  }

}
