import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';

import { Observable, from, ObservableLike } from 'rxjs';
import { map, switchMap, shareReplay, mergeMap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';
import { PlacesService } from '../places/places.service';
import { Place } from '../places/place.model';

interface BookArgument{
    placeId: string,
    userId: string,      
    guestNumber: number,
    bookedFrom: Date,
    bookedTo: Date
}

@Injectable({ 
    providedIn: 'root' 
})
export class BookingsService{
    constructor(
        private _httpClient:HttpClient,
        private _authService:AuthService,
        private _placesService:PlacesService
    ){}

    public addBooking(bookArg:BookArgument):Observable<BookArgument>
    {
        return this._httpClient.post<BookArgument>('https://ionic4-udemy.firebaseio.com/bookings.json' + '?auth=' + this._authService.tokenId, bookArg);
    }

    public deleteBooking(bookingId:string){
        return this._httpClient.delete('https://ionic4-udemy.firebaseio.com/bookings/'+bookingId+'.json' + '?auth=' + this._authService.tokenId);
    }

    private get _bookings$():Observable<Booking[]>{
        return this._httpClient.get<{[name:string]:BookArgument}>('https://ionic4-udemy.firebaseio.com/bookings.json' + '?auth=' + this._authService.tokenId)
            .pipe(
                map(
                    (resData:{[name:string]:BookArgument})=>{
                        if(!resData) return [];
                        //console.log('_bookings$ - ', resData);
                        let bookings:Booking[] = [];

                        Object.keys(resData).forEach(
                            (key:string)=>{
                              //console.log(key, resData[key]);
                              bookings.push(
                                new Booking(
                                  key,
                                  resData[key].placeId,
                                  resData[key].userId,
                                  resData[key].guestNumber,                                 
                                  new Date(resData[key].bookedFrom),
                                  new Date(resData[key].bookedTo),                                                  
                                )
                              );
                            }
                          );
                          
                          return bookings;
                    }
                ),
                shareReplay(1)
            );
    }

    public get myBookings$():Observable<Booking[]>{
        return this._bookings$.pipe(
            map(
                (bookings:Booking[])=>{
                    //console.log(bookings);
                    const myBookings:Booking[] = bookings.filter((booking:Booking)=>booking.userId === this._authService.userId);
                    return myBookings;
                }
            )
        )
    }

    public placeBookings$(placeId:string){
        return this._bookings$.pipe(
            map(
                (bookings:Booking[])=>{
                    const placeBookings:Booking[] = bookings.filter((booking:Booking)=>booking.placeId === placeId);
                    return placeBookings;
                }
            )
        )
    }

    /* public get myBookingsWithPlaces$():Observable<Booking>{
        return this.myBookings$.pipe(
            switchMap(
              (myBookings:Booking[])=>{                
                return from([...myBookings]);
              }
            ),
            mergeMap(
              (booking:Booking)=>{         
                return this._placesService.findById(booking.placeId).pipe(
                  map(
                    (place:Place)=>{
                      return { booking: booking, place: place };
                    }
                  )
                )
              }
            ),
            map(
              (data:{booking: Booking, place: Place})=>{
               data.booking.placeId = data.place;
               //console.log(data.booking);
               return data.booking
              }
            )
        );
    } */
    public get myBookingsWithPlaces$():Observable<Booking[]>{
        return this.myBookings$.pipe(
            switchMap(
              (myBookings:Booking[])=>{
                  return this._placesService.findByBookings(myBookings);
              }        
            ));            
    } 
}