import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, AlertController } from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage{

  private _places$:Observable<Place[]>;

  constructor(
    private _alertController:AlertController,
    private _placesService:PlacesService,
    private _router:Router
  ) { }

  ionViewWillEnter() {       
    this._places$ = this._placesService.offers;    
  } 

  private async presentAlert(place:Place, itemSliding:IonItemSliding) {
    const alert = await this._alertController.create({
      header: 'Cancel offer!',
      message: 'Do you want to cancel selected offer ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: ()=> {
            itemSliding.close();
          }                
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Cancel offer', place.id);
            /* this._bookingsService.deleteBooking(book.id).subscribe(
              (next)=>{
                console.log(next);
              },
              (error)=>{
                console.log(error);
              },
              ()=>{
                console.log('completed');                
              }
            ) */
            itemSliding.close();
          }
        }
      ]
    });

    return await alert.present();
  }

  private editIconClicked(place:Place, itemSliding:IonItemSliding):void{    
    this._router.navigate(['/', 'places', 'tabs', 'offers', 'edit-offer', place.id]);    
    itemSliding.close();
  }
  
  private deleteIconClicked(place:Place, itemSliding:IonItemSliding):void{    
    this.presentAlert(place, itemSliding);
  }

  private itemClicked(place:Place):void{
    this._router.navigate(['/', 'places', 'tabs', 'offers', 'offer-bookings', place.id]);
  }  
}
