import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';

const mapboxgl = require('mapbox-gl');

mapboxgl.accessToken =
  'pk.eyJ1IjoiamVmZnJpeW8iLCJhIjoiY2xoenluc3gxMWk3dDNkbnRnbGV6cjFhMSJ9.Hp9287N1c9f4JPrfEHoixg';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class GpsPage implements OnInit {
  location!: Position;

  @ViewChildren(Image, { read: ElementRef }) circle!: ElementRef;

  constructor() {
    this.printCurrentPosition();
  }

  ngOnInit() {}

  showMap() {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      // starting position [lng, lat] // no idea if you could dynamicly updated this
      center: [this.location.coords.longitude, this.location.coords.latitude],
      // you should be able to click on a point and choose a radius which would make a circle on the screen
      // the c
      zoom: 15, // starting zoom
    });
  }

  getCoordinates(event: { clientX: any; clientY: any; }) {
    // This output's the X coord of the click
    console.log(event.clientX);

    // This output's the Y coord of the click
    console.log(event.clientY);
    let style: string = "left:" + event.clientX + "px, top:" + event.clientY + "px"; // I have no idea dude
    this.circle.nativeElement.setAttribute('style', style);
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
    //console.log('Current position:', coordinates);
    console.log('Current position:', this.location);
    this.showMap();
  }
}
