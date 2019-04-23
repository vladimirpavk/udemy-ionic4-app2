import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Common } from '../../../common/common';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  private _didValidate:boolean = false;
  private _validationResult: {[key:string]:boolean} = {};
  private _offerForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this._offerForm=new FormGroup({
      'place': new FormGroup({
        'title': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        'description': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
        'imageUrl': new FormControl('', Validators.required),
        'price': new FormControl('', [Validators.required, Validators.min(1)])
      }),
      'startDate': new FormControl('', Validators.required),
      'endDate': new FormControl('', Validators.required)
    })
  }

  private formSubmitted(){      
    Common.validateForm(this._validationResult, '', this._offerForm);
    this._didValidate = true;
    console.log(this._validationResult);
  }
}
