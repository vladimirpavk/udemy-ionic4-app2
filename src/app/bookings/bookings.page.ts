import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
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
    let obs1 = interval(1000);
    //let obs2 = interval(1000);
    let obs2 = from([1,2,3,4,5]);

   /* obs1.subscribe(
     (x:number)=>{
       console.log('obs 1 - ' + x);
       obs2.subscribe(
        (x:number)=>{
          console.log('obs 2 - ' + x);
        }
      )
     }
   ); */
/* 
   let obsx = obs1.pipe(
      switchMap(
        (x:number)=>{
          console.log('obs 1 - ' + x);
          return obs2;
        }
      )
   );
   
   obsx.subscribe(
     (x:number)=>{
       console.log('obs 2 - ' + x);
     }
   ); */

   this._bookingsService.myBookings$.pipe(
     switchMap(
       (myBookings:Booking[])=>{
         return from([...myBookings]);
       }
     )
   ).subscribe(
     (book)=>{
       console.log(book);
     }
   )

    //this._bookings = this._bookingsService.getBookings();
   /*  this._bookingsService.myBookings$
      .pipe(
        map(
          (myBookings:Booking[])=>{
            return myBookings.forEach(
              (booking:Booking)=>{
                return booking;
              }
            )
          }),
        switchMap(
          (booking)=>{

          }
        )
      );


    this._bookingsService.myBookings$.pipe(map(
    (myBookings:Booking[])=>{
     return myBookings.forEach(
        (booking:Booking)=>{
          console.log(booking);
          this._placesService.findById(booking.placeId).subscribe(
            (place:Place)=>{
              booking.placeId=place.title;
              console.log(booking.placeId);
            }
          );
        }
      )
    }))
      .subscribe(
      (myBookings)=>{
        console.log('M< bookings - '+myBookings);        
      }
    ) */
   /*  this._bookingsService._bookings$.subscribe(
      (books:Booking[])=>{
        console.log(books)
      }
    ); */
  }

}
