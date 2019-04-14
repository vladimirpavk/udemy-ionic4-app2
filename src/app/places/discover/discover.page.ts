import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { CommonModule } from '../../common/common';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  private _randomIndex:number;
  private _places:Place[] = []; 
  private _favoritePlace:Place;

  constructor(private _placesService:PlacesService) { }

  ngOnInit() {
    let places = this._placesService.getPlaces();
    const rnd = CommonModule.randomize(places)    
    this._places = rnd.output;
    this._randomIndex = rnd.index;
    this._favoritePlace = places[this._randomIndex];
  } 

  private segmentChanged(event: CustomEvent){
    //console.log(event.detail.value);
  }
}
