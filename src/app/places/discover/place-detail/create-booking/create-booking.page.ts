import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { Place } from '../../../place.model';
import { AuthService } from '../../../../auth/auth.service';

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
    private _authService:AuthService
  ) { }

  ngOnInit() {
    this._userEmail = this._authService.email;    
  }

  private closeButtonClicked(status:string){
    this._modalController.dismiss({
      booking: {
        status: status,      
        numOfGuests:this.form.value['numOfGuests'],
        startFrom:this.form.value['fromDate'],
        endDate:this.form.value['toDate']
      }    
    });
  }
  
  private formSubmitted(f:NgForm){ 
    if(!this.form.valid) return;
    this.closeButtonClicked('confirmed');
  }

  private datesOk():boolean{
    //iz nekog razloga ne radi
    return (new Date(this.startDate.value)) > (new Date(this.endDate.value));
  }
}
