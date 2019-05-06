import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  public getPlaces(){
/*     return this._httpClient.get<Place[]>('https://ionic4-udemy.firebaseio.com/places.json' + '?auth=' + this._authService.tokenId)
      .pipe(
        map(
        (place)=>{
          console.log(place);
        }
      )); */
      this._httpClient.get<{[name:string]:PlaceData}>('https://ionic4-udemy.firebaseio.com/places.json' + '?auth=' + this._authService.tokenId)
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
              //console.log(places);
              return places;
            }
          )
        ).subscribe(
          (data:Place[])=>{
            console.log('Subscribe :', data);
          }
        )
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
