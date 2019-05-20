import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { Common } from '../../common/common';
import { Subscription, Observable } from 'rxjs';
import { UIService } from '../../common/ui.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  
  private _places$:Observable<{favoritePlace:Place, otherPlaces:Place[]}>;

  @ViewChild('ioncontent') ionContent;

  constructor(
    private _placesService:PlacesService,
    private _uiService:UIService
  ) { }

  ngOnInit() { 
    this._places$ = this._placesService.places;
    //console.log(this.ionContent);
  } 

  ngOnDestroy(){    
  }

  private segmentChanged(event: CustomEvent){
    //console.log(event.detail.value);
  }
 
}
