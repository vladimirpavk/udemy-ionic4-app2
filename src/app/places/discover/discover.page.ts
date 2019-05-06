import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { Common } from '../../common/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  private _randomIndex:number;
  private _places:Place[] = []; 
  private _favoritePlace:Place;
  private subs1:Subscription;

  constructor(private _placesService:PlacesService) { }

  ngOnInit() {
    /*this.subs1 = this._placesService.places$.subscribe(
      (places:Place[])=>{
        const rnd = Common.randomize(places)    
        this._places = rnd.output;
        this._randomIndex = rnd.index;
        this._favoritePlace = places[this._randomIndex];
      }
    ) */       
    this._placesService.getPlaces();
  } 

  ngOnDestroy(){
    this.subs1.unsubscribe();
  }

  private segmentChanged(event: CustomEvent){
    //console.log(event.detail.value);
  }
}
