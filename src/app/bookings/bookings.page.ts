import { Component, OnInit } from '@angular/core';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

import { Booking } from './booking.model';

import { BookingsService } from './bookings.service';
import { PlacesService } from '../places/places.service';
import { Place } from '../places/place.model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  private _bookings:Booking[] = [];

  constructor(
    private _bookingsService:BookingsService,
    private _placesService:PlacesService
  ) { }

  ngOnInit() {

    this._bookingsService.myBookingsWithPlaces$
      .subscribe((booking:Booking)=>{
        console.log(booking);
      });
  }

}
