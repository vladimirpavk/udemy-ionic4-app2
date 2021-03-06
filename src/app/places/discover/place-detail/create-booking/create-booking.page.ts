import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { Place } from '../../../place.model';
import { AuthService } from '../../../../auth/auth.service';
import { BookingsService } from '../../../../bookings/bookings.service';
import { UIService } from '../../../../common/ui.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.page.html',
  styleUrls: ['./create-booking.page.scss'],
})
export class CreateBookingPage implements OnInit {

  @Input('place') place:Place;
  @ViewChild('fromDate') startDate:NgModel;
  @ViewChild('toDate') endDate:NgModel;
  @ViewChild('f') form:NgForm;

  private _userEmail:string = '';

  constructor(
    private _modalController:ModalController,
    private _authService:AuthService,
    private _bookingsService:BookingsService,
    private _uiService:UIService,
    private _alertController:AlertController
  ) { }

  ngOnInit() {
    this._userEmail = this._authService.email;    
  }
 
  private async _presentBookingSuccess(){
    const alertPopUp = await this._alertController.create({      
      message:'Booking <strong>successfull<strong>...',
      buttons: [
        {
          text: 'Ok',
          handler: ()=>{
            this.dismissModal();
          }
        }
      ]
    });
    return await alertPopUp.present();
  }

  private async _presentBookingFailed(){
    const alertPopUpFailed = await this._alertController.create({      
      message:'Booking <strong>failed<strong>...',
      buttons: [
        {
          text: 'Retry',          
          handler: ()=>{
            this.makeBooking();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    return await alertPopUpFailed.present();
  }

  private dismissModal(){
    this._modalController.dismiss();
  }
  
  private formSubmitted(f:NgForm){ 
    if(!this.form.valid) return;
    this.makeBooking();
   
  }

  private async makeBooking(){
    await this._uiService.showSpinner('spinner1', 'Booking in progress');
    //console.log('Guest number: '+this.form.valid['numOfGuests']); 
    this._bookingsService.addBooking(
      {
        placeId: this.place.id,
        userId: this._authService.userId,
        guestNumber: this.form.value['numOfGuests'],
        bookedFrom: this.form.value['fromDate'],
        bookedTo: this.form.value['toDate']
      }).subscribe(
        (booking)=>{
          //console.log(booking);
          this._uiService.hideSpinner('spinner1');
          this._presentBookingSuccess();
        },
        (error:any)=>{
          this._uiService.hideSpinner('spinner1');
          //console.log('Network connection error - ', error);          
          this._presentBookingFailed();
        }
      )
  }

  private datesOk():boolean{
    //iz nekog razloga ne radi
    return (new Date(this.startDate.value)) > (new Date(this.endDate.value));
  }
}
