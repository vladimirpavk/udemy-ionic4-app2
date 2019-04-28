import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from '../../../place.model';
import { NgForm, NgModel } from '@angular/forms';

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

  constructor(
    private _modalController:ModalController
  ) { }

  ngOnInit() {
  }

  private closeButtonClicked(status:string){
    this._modalController.dismiss({
      booking: {
        status: status,
        firstName: this.form.value['firstName'],
        lastName:this.form.value['lastname'],
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
