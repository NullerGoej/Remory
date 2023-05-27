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
  map!: any;
  markerLocation: {longitude: number, latitude: number} = {longitude: 0, latitude: 0};
  @ViewChildren(Image, { read: ElementRef }) circle!: ElementRef;

   constructor(private modalController: ModalController, private databaseService: DatabaseService) {
    this.printCurrentPosition();
   }

  ngOnInit(){
    console.log("Page3 writing task object");
    console.log(JSON.stringify(this.databaseService.createTask));
  }

  showMap() {
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      // starting position [lng, lat] // no idea if you could dynamicly updated this
      center: [this.location.coords.longitude, this.location.coords.latitude],
      // you should be able to click on a point and choose a radius which would make a circle on the screen
      zoom: 15, // starting zoom
    });
    const marker = new mapboxgl.Marker({
      draggable: false
      }).setLngLat([this.location.coords.longitude, this.location.coords.latitude])
      .addTo(this.map );
    this.map.on('click', (e: { lngLat: { lng: any; lat: any; }; }) => {
      marker.setLngLat([e.lngLat.lng, e.lngLat.lat]);
      this.markerLocation.longitude = e.lngLat.lng;
      this.markerLocation.latitude = e.lngLat.lat;
    });
    this.map.once('load', () => {
      this.map.resize();
      document.getElementById('map')!.style.opacity = "1";
    });
  }

  async printCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.location = coordinates;
    this.showMap();
    console.log('Current position:', this.location);
  }

  finishTaskModal(){
    this.databaseService.createTask.gps = this.markerLocation.longitude.toString() +"," + this.markerLocation.latitude.toString()
    console.log(JSON.stringify(this.databaseService.createTask));
  }
  
  async cancel(){
    await this.modalController.dismiss();
  }
}
