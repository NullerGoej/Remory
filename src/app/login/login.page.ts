import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {FormBuilder, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class LoginPage implements OnInit {

loginForm!: FormGroup; 

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {this.loginForm=this.formBuilder.group({email:["",[Validators.required]] ,password:["",[Validators.required]]});}

  saveChanges() {
    console.log(this.loginForm.value);
  }

}
