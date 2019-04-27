import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.page.html',
  styleUrls: ['./create-booking.page.scss'],
})
export class CreateBookingPage implements OnInit {

  @Input('value') value:number;

  constructor(
    private _modalController:ModalController
  ) { }

  ngOnInit() {
  }

  private closeButtonClicked(){
    this._modalController.dismiss({
      data: 'any Data'     
    });
  }
  
  private formSubmitted(f:any){ 
    console.log(f);
  }
}
