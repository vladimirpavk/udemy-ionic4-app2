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

    this._observableNumber$=interval(1000).pipe(
      take(5),
      shareReplay(1),
      map(
        (value:number)=>{
          return value*2;
        }
      )
    );


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

  private subscribe(){    
/*     let proba=this._numOfSubs++;
    this._subscriptions.push(
      this._observableNumber$.subscribe(
        (value:number)=>{          
          console.log('from '+proba+' :', value);
        }
      )
    ) */
    let proba=this._numOfSubs++;
    this._subscriptions.push(
      this._placesService.ofNeka.subscribe(
        (value)=>{          
          console.log('from '+proba+' :', value);
        }
      )
    );
  }

}
