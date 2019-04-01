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

  constructor(private _placesService:PlacesService) { }

  ngOnInit() {
    const rnd = CommonModule.randomize(this._placesService.getPlaces())
    console.log(rnd);
    this._places = rnd.output;
    this._randomIndex = rnd.index;
  } 
}
