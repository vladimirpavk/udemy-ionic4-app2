import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  private _offerForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this._offerForm=new FormGroup({
      'place': new FormGroup({
        'title': new FormControl(),
        'description': new FormControl(),
        'imageUrl': new FormControl(),
        'price': new FormControl()
      }),
      'startDate': new FormControl(),
      'endDate': new FormControl()
    })
  }

  private formSubmitted(){
    console.log(this._offerForm);
  }

}
