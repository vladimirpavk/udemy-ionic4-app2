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

 /*  private dismissModal(status:string){
    this._modalController.dismiss({
      booking: {
        status: status,      
        numOfGuests:this.form.value['numOfGuests'],
        startFrom:this.form.value['fromDate'],
        endDate:this.form.value['toDate']
      }    
    });
  } */

  private async _presentBookingSuccess(){
    const alertPopUp = await this._alertController.create({      
      message:'Booking <strong>successfull<strong>',
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

  private dismissModal(){
    this._modalController.dismiss();
  }
  
  private formSubmitted(f:NgForm){ 
    if(!this.form.valid) return;
    //this.dismissModal('confirmed');
    this._uiService.showSpinner('spinner1', 'Booking in progress');
    this._bookingsService.addBooking(
      {
        placeId: this.place.id,
        userId: this._authService.userId,
        guestNumber: this.form.valid['numOfGuests'],
        bookedFrom: this.form.value['fromDate'],
        bookedTo: this.form.value['toDate']
      }).subscribe(
        (booking)=>{
          //console.log(booking);
          this._uiService.hideSpinner('spinner1');
          this._presentBookingSuccess();
        },
        (error:any)=>{
          
        }
      )
  }

  private datesOk():boolean{
    //iz nekog razloga ne radi
    return (new Date(this.startDate.value)) > (new Date(this.endDate.value));
  }
}
