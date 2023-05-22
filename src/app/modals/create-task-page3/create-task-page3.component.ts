import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-create-task-page3',
  templateUrl: './create-task-page3.component.html',
  styleUrls: ['./create-task-page3.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule]
})
export class CreateTaskPage3Component  implements OnInit {

  gps: string = ""; 

   constructor(private modalController: ModalController, private databaseService: DatabaseService) {}

  ngOnInit(){
    console.log("Page3 writing task object");
    console.log(JSON.stringify(this.databaseService.createTask));
  }

  finishTaskModal(){
    console.log(this.gps);
    this.databaseService.createTask.gps = this.gps;
    console.log(JSON.stringify(this.databaseService.createTask));
  }
  
  async cancel(){
    await this.modalController.dismiss();
  }
}
