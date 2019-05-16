import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { Observable, Subscription, interval } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  private _places:Place[];
  private _subs1:Subscription;

  private _places$:Observable<{favoritePlace:Place, otherPlaces:Place[]}>;

  private subscription;

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
    //this._placesService.proba();
    //this._places$ = this._placesService.places.shareReplay(1);

    const obs$ = interval(1000);
    this. subscription = obs$.pipe(
      take(50),
      shareReplay(1)
    );
    this.subscription.subscribe(x => console.log('source A: ', x));    
  }

  private startMe(){
    this.subscription.subscribe(y => console.log('source B: ', y));
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
