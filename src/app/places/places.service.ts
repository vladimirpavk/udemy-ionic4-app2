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
        'id 1',
        'Hotel Kasina',
        'Hotel u srcu Beograda',
        'https://mapio.net/images-p/8232511.jpg',
        20
      ),
      new Place(
        'id 2',
        'Hotel Jugoslavija',
        'Hotel na Novom Beogradu',
        'https://www.totallylost.eu/wp-content/uploads/2014/04/Sezione-B_Belgrade_01.jpg',
        75
      )
    ];
  }

  public getPlaces():Place[]{
    return [...this._places];
  }

}
