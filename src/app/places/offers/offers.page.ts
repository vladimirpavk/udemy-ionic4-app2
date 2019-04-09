import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  private _places:Place[];

  constructor(
    private _placesService:PlacesService,
    private _router:Router
  ) { }

  ngOnInit() {
      this._places = this._placesService.getPlaces();
  }

  private trashIconClicked(place:Place):void{
    console.log(place);
  }

  private itemClicked(place:Place):void{
    this._router.navigate(['/', 'places', 'tabs', 'offers', 'offer-bookings', place.id]);
  }

}
