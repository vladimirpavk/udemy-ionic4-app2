import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Common } from '../../../common/common';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  private _place:Place;
  private _offersForm:FormGroup;
  private _didValidate:boolean = false;
  private _validationResult: {[key:string]:boolean} = {};

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _placesService:PlacesService,
    private router:Router
  ) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      (paramMap:ParamMap)=>{
        //this._place = this._placesService.findById(paramMap.get('id'));

        this._offersForm = new FormGroup({
          title: new FormControl(this._place.title, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
          description: new FormControl(this._place.description, [Validators.required, Validators.minLength(3), Validators.maxLength(120)])
        });
      }
    );
  }

  private formSubmitted(){
    Common.validateForm(this._validationResult, '', this._offersForm);    
    this._didValidate = true;
    if(this._offersForm.valid){
      //uradi nešto
      this.router.navigate(['/','places', 'tabs',  'offers']);
      let newPlace:Place = new Place(
        this._place.id,
        this._offersForm.value['title'],
        this._offersForm.value['description'],
        this._place.imageUrl,
        this._place.price,
        this._place.availableFrom,
        this._place.availableTo,
        this._place.userId
      );      
      //this._placesService.replace(this._place, newPlace);
    }
  }
}
