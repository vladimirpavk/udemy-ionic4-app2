import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, ReplaySubject, Subscriber, interval } from 'rxjs';
import { take, map, shareReplay, filter, tap } from 'rxjs/operators';

import { Place } from './place.model';
import { Common } from '../common/common';

import { AuthService } from '../auth/auth.service';
import { OffersPage } from './offers/offers.page';

interface PlaceData{
  availableFrom: string,
  availableTo: string,
  description: string,
  price: number,
  imageUrl: string,
  title: string,
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  
  private _places:Observable<{favoritePlace:Place, otherPlaces:Place[]}>;

  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) { 

    this._places = this._httpClient.get<{[name:string]:PlaceData}>('https://ionic4-udemy.firebaseio.com/places.json' + '?auth=' + this._authService.tokenId)
    .pipe(        
      map(
        (resData:{[name:string]:PlaceData})=>{
          
          let places:Place[] = [];

          Object.keys(resData).forEach(
            (key:string)=>{
              //console.log(key, resData[key]);
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId                      
                )
              );
            }
          );
          //ovde imaš Place[] sa podacima
          const rnd = Common.randomize(places)    
          let rndPlaces:Place[] = rnd.output;
          let rndIndex:number = rnd.index;
          let rndFavoritePlace:Place = places[rndIndex];

          const result = 
            {
              favoritePlace:rndFavoritePlace,
              otherPlaces:rndPlaces
            };
          
          //console.log(result);

          return result;
        }
      ),
      shareReplay(1)
    );        
  }  
  
  public get places():Observable<{favoritePlace:Place, otherPlaces:Place[]}>{
    return this._places;
  }
  

  public get offers():Observable<Place[]>{
    return this.places.pipe(
      map(
        (places:{favoritePlace:Place, otherPlaces:Place[]})=>{
          return [...places.otherPlaces, places.favoritePlace]
        }
      ),
      shareReplay(1)
    );
  }

  public ofNeka:Observable<number> = interval(1000).pipe(
    take(5),
    shareReplay(1)
  );

  public get offfers2():Observable<number>{
    return interval(1000).pipe(
      take(5),
      shareReplay(1)
    );
  }

  public findById(id:string):Observable<Place>{    
    return this.places.pipe(
      map((places:{favoritePlace:Place, otherPlaces:Place[]})=>[...places.otherPlaces, places.favoritePlace]),
      map((places:Place[])=>{
        //console.log([...places]);
        return places.find(
          (place:Place)=>place.id==id
        );        
      })
    );    
  }

  public updatePlace(newPlace:Place):Observable<Object>{
    const url=`https://ionic4-udemy.firebaseio.com/places/${newPlace.id}.json`;
    return this._httpClient.put(url, { ...newPlace, id:null });
  }
}
