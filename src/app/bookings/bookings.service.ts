import { Injectable } from "@angular/core";
import { Booking } from './booking.model';
import { Place } from '../places/place.model';

@Injectable({ providedIn: 'root' })
export class BookingsService {
    private _bookings:Booking[] = [
        new Booking(
            new Place(
                'id1',
                'Hotel Kasina',
                'Hotel u srcu Beograda',
                'https://mapio.net/images-p/8232511.jpg',
                20
              ),
              'vladimirpavk',
              3
        ),
        new Booking(
            new Place(
                'id2',
                'Hotel Jugoslavija',
                'Hotel na Novom Beogradu',
                'https://www.totallylost.eu/wp-content/uploads/2014/04/Sezione-B_Belgrade_01.jpg',
                75
              ),
              'natasapavk',
              5
        )        
    ];

    constructor(){}

    public getBookings():Booking[]
    {        
        return [...this._bookings];
    }
}