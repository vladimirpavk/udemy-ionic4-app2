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
    const map = new google.maps.Map(this.mapDivElementRef.nativeElement, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  private dismissModal(){
    this._modalCtrl.dismiss();
  }
}
