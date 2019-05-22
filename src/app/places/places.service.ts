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
  
  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) { }  

  public get places():Observable<{favoritePlace:Place, otherPlaces:Place[]}>{
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
        console.log([...places]);
        return places.find(
          (place:Place)=>place.id==id
        );        
      })
    );    
  }
} 
  
  /* public places$:Observable<Place[]>=new Observable<Place[]>();

  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) {
      //this.places$ = this._httpClient.get<Place[]>( 'https://ionic4-udemy.firebaseio.com/places.json' + '?auth=' + this._authService.tokenId);
      this._httpClient.get<Place[]>('https://ionic4-udemy.firebaseio.com/places.json' + '?auth=' + this._authService.tokenId)
        .subscribe(
          (response:Place[])=>{
            console.log(response);
          }
        )
/*     this._places.forEach(
      (place:Place)=>{
        this._httpClient.post<Place>(
          'https://ionic4-udemy.firebaseio.com/places.json' + '?auth=' + this._authService.tokenId,
          place, httpOptions).subscribe((response)=>console.log('from http response', response))
      }
    ); */      

 /* get places():Observable<Place[]>{
    return this.places$.asObservable();
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
    this.places$.next(this._places.splice(this._places.indexOf(oldPlace), 1, newPlace));           
  }

  public addPlace(place:Place){
    place.id = Math.random().toString();
    place.userId = this._authService.userId;
    this._places.push(place);
    
    this.places$.next(this._places);
  }*/ 
