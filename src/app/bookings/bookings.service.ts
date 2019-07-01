import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';

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
        private _authService:AuthService
    ){}

    public addBooking(bookArg:BookArgument):Observable<BookArgument>
    {
        return this._httpClient.post<BookArgument>('https://ionic4-udemy.firebaseio.com/bookings.json' + '?auth=' + this._authService.tokenId, bookArg);
    }

    public get _bookings$():Observable<Booking[]>{
        return this._httpClient.get<{[name:string]:BookArgument}>('https://ionic4-udemy.firebaseio.com/bookings.json' + '?auth=' + this._authService.tokenId)
            .pipe(
                map(
                    (resData:{[name:string]:BookArgument})=>{
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
}