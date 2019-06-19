import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { take, map, filter, tap, shareReplay } from 'rxjs/operators';

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
  
  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) {}  
  
  private get _places$():Observable<Place[]>{
    return this._httpClient.get<{[name:string]:PlaceData}>('https://ionic4-udemy.firebaseio.com/places.json' + '?auth=' + this._authService.tokenId)
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
          return places;
        }
        ),
      shareReplay(1)
    );
  }

  public get discoveredPlaces():Observable<{favoritePlace:Place, otherPlaces:Place[]}>{
    //return this._places$.asObservable();
    return this._places$.pipe(
      map(
      (places:Place[])=>{
        const rnd = Common.randomize(places);    
          let rndPlaces:Place[] = rnd.output;
          let rndIndex:number = rnd.index;
          let rndFavoritePlace:Place = places[rndIndex];

          const result = 
            {
              favoritePlace:rndFavoritePlace,
              otherPlaces:rndPlaces
            };
          
          return result;
      }
    ));        
  }
  
  public get offers():Observable<Place[]>{
    return this._places$.pipe(
      map(
        (places:Place[])=>{
          const filteredPlaces:Place[] = places.filter((place:Place)=>place.userId===this._authService.userId);
          return filteredPlaces;
        }
      )
    );
  }

  public findById(id:string):Observable<Place>{    
    return this._places$.pipe(      
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

  public updatePlaces$(newPlace:Place):void{
    this.offers.pipe(
      tap((places:Place[])=>{
        const filteredPlaces =  places.filter((place:Place)=>place.id!==newPlace.id);
        return [...filteredPlaces, newPlace];
      })
      //tap((places:Place[])=>this._places$.next(places)
    )
  } 
}
