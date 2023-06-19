<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
=======
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../interfaces/task';
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.page.html',
  styleUrls: ['./task-info.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TaskInfoPage implements OnInit {

<<<<<<< HEAD
  constructor() { }
=======
  task: Task;
  taskService: TaskService = inject(TaskService);

  constructor(public navCtrl: NavController, public popoverController: PopoverController, private activatedRoute: ActivatedRoute) {
    this.task = JSON.parse(this.activatedRoute.snapshot.paramMap.get('object')!);
  }
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95

  ngOnInit() {
  }

<<<<<<< HEAD
=======
  async presentPopover(e: Event) { // still a bunch of code just to use a object/component
    const popover = await this.popoverController.create({  // we create a popup from the existing pop-upComponent class so to say, you could switch out the component to create
      component: PopUpComponent,
      componentProps: { description: "Are you sure you want to delete " + this.task.title } // value to send as input param
    });

      await popover.present(); 
      
      popover.onDidDismiss()
      .then((data) => {

        if(data?.data) this.deleteTask();
      });
  }

  fixTime(date: Date){  
    let d = date.toString();
    return d.slice(0, d.length -3);
  }

  async deleteTask(): Promise<void>{
    this.taskService.delete(this.task.task_id).subscribe((data: any) => {
      let d = data;
    });
  }

>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
}
