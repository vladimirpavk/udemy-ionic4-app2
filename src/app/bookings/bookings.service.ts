import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';

interface BookArgument{
    placeId: string,        
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
}