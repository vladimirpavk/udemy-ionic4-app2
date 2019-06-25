export class Booking {
    constructor(
      public id: string,
      public placeId: string,
      public userId: string,      
      public guestNumber: number,
      public bookedFrom: Date,
      public bookedTo: Date
    ) {}
  }