import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { Geolocation, Position } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';

const mapboxgl = require('mapbox-gl');
mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-create-task-page3',
  templateUrl: './create-task-page3.component.html',
  styleUrls: ['./create-task-page3.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule]
})
export class CreateTaskPage3Component  implements OnInit {

  location!: Position;
  @ViewChildren(Image, { read: ElementRef }) circle!: ElementRef;

   constructor(private modalController: ModalController, private databaseService: DatabaseService) {
    this.printCurrentPosition();
   }

  ngOnInit(){
    console.log("Page3 writing task object");
    console.log(JSON.stringify(this.databaseService.createTask));
  }

  showMap() {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      // starting position [lng, lat] // no idea if you could dynamicly updated this
      center: [this.location.coords.longitude, this.location.coords.latitude],
      // you should be able to click on a point and choose a radius which would make a circle on the screen
      zoom: 15, // starting zoom
    });
  }

  getCoordinates(event: { clientX: any; clientY: any; }) {
    // This output's the X coord of the click
    console.log(event.clientX);

    // This output's the Y coord of the click
    console.log(event.clientY);
    let style: string = "left:" + event.clientX + "px, top:" + event.clientY + "px"; // I have no idea dude
    //this.circle.nativeElement.setAttribute('style', style);
  }

  followPos() {
    setTimeout(async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      this.location = coordinates;
    }, 1500);
  }

  async printCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.location = coordinates;
    this.showMap();
    console.log('Current position:', this.location);
  }

  finishTaskModal(){
    this.databaseService.createTask.gps = this.location.coords.latitude.toString() +"," + this.location.coords.longitude.toString();
    console.log(JSON.stringify(this.databaseService.createTask));
  }
  
  async cancel(){
    await this.modalController.dismiss();
  }
}
