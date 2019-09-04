/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit, AfterViewInit {

  @ViewChild('mapdiv') mapDivElementRef:ElementRef;

  constructor(
    private _modalCtrl:ModalController
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    window.navigator.geolocation.getCurrentPosition(
      (position:Position)=>{
        //console.log('current position', position);
        const map = new google.maps.Map(this.mapDivElementRef.nativeElement, {
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          zoom: 20
        });
        map.addListener('click', (eventArgs)=>{
          //console.log(eventArgs);
          this._modalCtrl.dismiss(
            {
              lat: eventArgs.latLng.lat(),
              lng: eventArgs.latLng.lng()
            }
          )
        });        
      },
      ()=>{
        console.error('Current position could not be determined...');
      }
    );   
  }

  private dismissModal(){
    this._modalCtrl.dismiss();
  }
}
