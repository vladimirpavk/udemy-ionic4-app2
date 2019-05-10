import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  private _places:Place[];
  private _subs1:Subscription;

  constructor(
    private _placesService:PlacesService,
    private _router:Router
  ) { }

  ngOnInit() {
   /*  this._subs1 = this._placesService.places.subscribe(
      (places:Place[])=>{
        this._places = places;
      }
    ); */
  }

  ngOnDestroy() {
    this._subs1.unsubscribe();
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
