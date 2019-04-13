import { Place } from '../places/place.model';

export class Booking{
    constructor(
        public place:Place,
        public userName:string,
        public guests:number
    ){}
}