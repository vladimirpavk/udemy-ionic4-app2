import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  private _places:Place[];

  constructor(
    private _placesService:PlacesService,
    private _router:Router
  ) { }

  ngOnInit() {
      this._places = this._placesService.getPlaces();
  }

  private editIconClicked(place:Place, itemSliding:IonItemSliding):void{
    //console.log(place);
    this._router.navigate(['/', 'places', 'tabs', 'offers', 'edit-offer', place.id]);    
    itemSliding.close();
  }

  private itemClicked(place:Place):void{
    this._router.navigate(['/', 'places', 'tabs', 'offers', 'offer-bookings', place.id]);
  }

}
