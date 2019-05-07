import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Common } from '../../../common/common';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  private _didValidate:boolean = false;
  private _validationResult: {[key:string]:boolean} = {};
  private _offerForm: FormGroup;

  constructor(
    private _placesService:PlacesService,
    private _authService:AuthService,
    private _router:Router
  ) { }

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
    if( this._offerForm.valid ){
      //submit the form
        /*this._placesService.addPlace(
        new Place(
          '',
          this._offerForm.value['place']['title'],
          this._offerForm.value['place']['description'],
          this._offerForm.value['place']['imageUrl'],
          this._offerForm.value['place']['price'],
          this._offerForm.value['startDate'],
          this._offerForm.value['endDate'],
          this._authService.userId
        )
        );*/
      this._router.navigate(['/', 'places', 'tabs', 'offers']);
    }
  }
}
