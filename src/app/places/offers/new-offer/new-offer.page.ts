import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  private _offerForm: FormGroup;

  private _titleValid:boolean = true;
  private _descriptionValid:boolean = true;
  private _imageUrlValid:boolean = true;
  private _priceValid:boolean = true;
  private _startDateValid:boolean = true;
  private _endDateValid:boolean = true;  

  constructor() { }

  ngOnInit() {
    this._offerForm=new FormGroup({
      'place': new FormGroup({
        'title': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        'description': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        'imageUrl': new FormControl('', Validators.required),
        'price': new FormControl('', Validators.min(1))
      }),
      'startDate': new FormControl('', Validators.required),
      'endDate': new FormControl('', Validators.required)
    })
  }

  private formSubmitted(){
    console.log(this._offerForm);
    //console.log((<FormGroup>this._offerForm.controls['place']).controls['title']);
    /*this._titleValid = (<FormGroup>this._offerForm.controls['place']).controls['title'].valid && !(<FormGroup>this._offerForm.controls['place']).controls['title'].pristine;
    this._descriptionValid =(<FormGroup>this._offerForm.controls['place']).controls['description'].valid && !(<FormGroup>this._offerForm.controls['place']).controls['description'].pristine;
    this._imageUrlValid =(<FormGroup>this._offerForm.controls['place']).controls['imageUrl'].valid && !(<FormGroup>this._offerForm.controls['place']).controls['imageUrl'].pristine;
    this._priceValid =(<FormGroup>this._offerForm.controls['place']).controls['price'].valid && !(<FormGroup>this._offerForm.controls['place']).controls['price'].pristine;

    this._startDateValid=(<FormGroup>this._offerForm.controls['startDate']).valid && !(<FormGroup>this._offerForm.controls['startDate']).pristine;
    this._endDateValid=(<FormGroup>this._offerForm.controls['endDate']).valid && !(<FormGroup>this._offerForm.controls['endDate']).pristine;*/


    let result = {};

    this._offerForm.contr
  }

  private validateForm(form:FormGroup):{ [key:string] : boolean }{
    
    return;
  }

}
