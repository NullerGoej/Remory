import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.page.html',
  styleUrls: ['./task-info.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TaskInfoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
