import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  private _places$:Observable<Place[]>;

  constructor(
    private _placesService:PlacesService,
    private _router:Router
  ) { }

  ngOnInit() {   
    this._places$ = this._placesService.offers;    
  } 

  private editIconClicked(place:Place, itemSliding:IonItemSliding):void{    
    this._router.navigate(['/', 'places', 'tabs', 'offers', 'edit-offer', place.id]);    
    itemSliding.close();
  }

  private itemClicked(place:Place):void{
    this._router.navigate(['/', 'places', 'tabs', 'offers', 'offer-bookings', place.id]);
  } 
}
