import { Component, OnInit } from '@angular/core';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  private _bookings:Booking[] = [];

  constructor(
    private _bookingsService:BookingsService
  ) { }

  ngOnInit() {
    //this._bookings = this._bookingsService.getBookings();
    this._bookingsService.myBookings$.subscribe(
      (myBookings:Booking[])=>{
        console.log(myBookings);
      }
    )
   /*  this._bookingsService._bookings$.subscribe(
      (books:Booking[])=>{
        console.log(books)
      }
    ); */
  }

}
