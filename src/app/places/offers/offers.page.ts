import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

import { Observable, Subscription, interval } from 'rxjs';
import { shareReplay, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  private _places:Place[];
  private _subs1:Subscription;

  private _places$:Observable<Place[]>;

  private subscription;

  private _observableNumber$:Observable<number>;

  private _numOfSubs:number = 0;
  private _subscriptions:Subscription[] = [];

  constructor(
    private _placesService:PlacesService,
    private _router:Router
  ) { }

  ngOnInit() {   

    this._places$ = this._placesService.offers;
    
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
