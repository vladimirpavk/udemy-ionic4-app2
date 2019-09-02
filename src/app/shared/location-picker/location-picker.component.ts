import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  constructor(
    private _modalCtrl:ModalController
  ) { }

  ngOnInit() {}

  private dismissModal(){
    this._modalCtrl.dismiss();
  }
}
