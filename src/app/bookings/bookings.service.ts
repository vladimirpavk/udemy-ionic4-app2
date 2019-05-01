import { Injectable } from "@angular/core";
import { Booking } from './booking.model';
import { Place } from '../places/place.model';

@Injectable({ providedIn: 'root' })
export class BookingsService {
    private _bookings:Booking[] = [];

    constructor(){}

    public getBookings():Booking[]
    {        
        return [...this._bookings];
    }
}