import { Place } from '../places/place.model';

export class Booking {
    constructor(
      public id: string,
      public placeId: string | Place,
      public userId: string,      
      public guestNumber: number,
      public bookedFrom: Date,
      public bookedTo: Date
    ) {}
  }