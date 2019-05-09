import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { Common } from '../../common/common';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  
  private _places$:Observable<{favoritePlace:Place, otherPlaces:Place[]}>;

  constructor(private _placesService:PlacesService) { }

  ngOnInit() { 
    this._places$ = this._placesService.places;
  } 

  ngOnDestroy(){    
  }

  private segmentChanged(event: CustomEvent){
    //console.log(event.detail.value);
  }
}
