import { Place } from '../places/place.model';

export class Booking{
    constructor(
        public place:Place,
        public userId:string,
        public guests:number
    ){}
}