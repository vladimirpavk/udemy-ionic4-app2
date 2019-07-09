import { Component, OnInit } from '@angular/core';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

import { Booking } from './booking.model';

import { BookingsService } from './bookings.service';
import { PlacesService } from '../places/places.service';
import { Place } from '../places/place.model';
import { interval } from 'rxjs';
import { AlertController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  private _bookings:Booking[] = [];

  constructor(
    private _bookingsService: BookingsService,
    private _placesService: PlacesService,
    private _alertController: AlertController
  ) { }

  ngOnInit() {
    this.updateBookings();   
  }

  private updateBookings():void{
    this._bookingsService.myBookingsWithPlaces$
    .subscribe((booking:Booking)=>{
      console.log(booking);
      if(booking) this._bookings.push(booking);
    });
  }

  ionViewWillEnter(){
    console.log('ionviewwillenter');
  }

  private async presentAlert(book:Booking, itemSliding:IonItemSliding) {
    const alert = await this._alertController.create({
      header: 'Cancel reservation!',
      message: 'Do you want to cancel your reservation ?',
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
            console.log('Cancel reservation');
            this._bookingsService.deleteBooking(book.id).subscribe(
              (next)=>{
                console.log(next);
              },
              (error)=>{
                console.log(error);
              },
              ()=>{
                console.log('completed');
                this.updateBookings();
              }
            )
            itemSliding.close();
          }
        }
      ]
    });

    return await alert.present();
  }

  private cancelClicked(book:Booking, itemSliding:IonItemSliding):void{    
    this.presentAlert(book, itemSliding);
  }
}
