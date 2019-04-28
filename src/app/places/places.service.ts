import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places:Place[] = []

  constructor() {
    this._places = [
      new Place(
        'id1',
        'Hotel Kasina',
        'Hotel u srcu Beograda',
        'https://mapio.net/images-p/8232511.jpg',
        20,
        new Date('2019-01-01'),
        new Date('2019-12-31')
      ),
      new Place(
        'id2',
        'Hotel Jugoslavija',
        'Hotel na Novom Beogradu',
        'https://www.totallylost.eu/wp-content/uploads/2014/04/Sezione-B_Belgrade_01.jpg',
        75,
        new Date('2019-01-01'),
        new Date('2019-12-31')
      ),
    new Place(
      'id3',
      'Hotel City Savoy',
      'Hotel City Savoy',
      'https://t-ec.bstatic.com/xdata/images/hotel/square200/116010188.webp?k=a5b6767e357cd57be2579b145ffbab7ab885d316860aa8e0ad3bd73cdc876694&o=',
      40,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'id4',
      'Hotel Life Design',
      'Hotel Life Design',
      'https://t-ec.bstatic.com/xdata/images/hotel/square200/19679512.webp?k=29a4e712694ccf46706dd39cafaa41a9355f1fe5d25c81eeb91e3d6cfd20ee1d&o=',
      75,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'id5',
      'Sky Hotel',
      'Hotel Sky',
      'https://t-ec.bstatic.com/xdata/images/hotel/square200/178821089.webp?k=b96bc29604bec16370eee07718c92729589b26dfd2a6c9af28baa21aa7db2428&o=',
      75,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    )];
  }

  public getPlaces():Place[]{
    return [...this._places];
  }

  public findById(id:string):Place{
    let placeFound = null;
    this._places.forEach(
      (place:Place)=>{
        if(place.id === id)
        {          
          placeFound = place;
        }        
      }
    );
    return placeFound;
  }

  public findByPlace(place:Place):number{
    return this._places.indexOf(place);
  }

  public replace(oldPlace:Place, newPlace:Place){
    this._places.splice(this._places.indexOf(oldPlace), 1, newPlace);
    console.log(this._places);
  }
}
