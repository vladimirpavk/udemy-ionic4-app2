import { Component, OnInit } from '@angular/core';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

import { Booking } from './booking.model';

import { BookingsService } from './bookings.service';
import { PlacesService } from '../places/places.service';
import { Place } from '../places/place.model';
import { interval } from 'rxjs';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { UIService } from '../common/ui.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  
  private _myBookings$:Observable<Booking[]>;

  constructor(
    private _bookingsService: BookingsService,
    private _placesService: PlacesService,
    private _alertController: AlertController,
    private _uiService:UIService
  ) { }

  ngOnInit() {   
    this._myBookings$ = this._bookingsService.myBookingsWithPlaces$;    
  }

  private async _presentBookingDeletedSuccess():Promise<void>{
    const bookingDeletedSuccess:HTMLIonAlertElement = await this._alertController.create({
      message:'Booking <strong>deleted<strong>...',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: ()=>{
            //this.dismissModal();
            this._myBookings$ = this._bookingsService.myBookingsWithPlaces$; 
          }
        }
      ]
    });
    return await bookingDeletedSuccess.present();   
  }

  private async _presentBookingDeletedFailed(book:Booking):Promise<void>{
    const bookingDeletedFailed:HTMLIonAlertElement = await this._alertController.create({
      message:'Booking <strong>canceled failed<strong>...',
      buttons: [
        {
          text: 'Retry',          
          handler: ()=>{
            this._deleteBooking(book);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    return await bookingDeletedFailed.present();   
  }

  private async presentAlert(book:Booking, itemSliding:IonItemSliding):Promise<void> {    
    const alert:HTMLIonAlertElement = await this._alertController.create({
      header: 'Cancel reservation!',
      message: 'Do you want to cancel your reservation ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: ()=> {
            itemSliding.close();
          }                
        },
        {
          text: 'Yes',
          handler: () => {
            this._deleteBooking(book);
          }
        }
      ]
    });
    return await alert.present();
  }

  private async _deleteBooking(book:Booking){
    await this._uiService.showSpinner('spinner1', 'Deleting...');
    this._bookingsService.deleteBooking(book.id).subscribe(
      (next)=>{
        this._uiService.hideSpinner('spinner1');
        this._presentBookingDeletedSuccess();
        //console.log('Booking deleted...');
      },
      (error)=>{
        this._uiService.hideSpinner('spinner1');
        //console.log('Something bad happened...', error);
        this._presentBookingDeletedFailed(book);
      },
      ()=>{
       /*  console.log('completed');
        this.updateBookings(); */
      }
    )
  }

  private cancelClicked(book:Booking, itemSliding:IonItemSliding):void{    
    this.presentAlert(book, itemSliding);
  }
}
