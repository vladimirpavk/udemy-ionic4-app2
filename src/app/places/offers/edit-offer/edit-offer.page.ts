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
  private _didLoad:boolean = false;
  private _validationResult: {[key:string]:boolean} = {};
  private _hasHttpsErrors: boolean = false;

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _placesService:PlacesService,
    private router:Router
  ) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      (paramMap:ParamMap)=>{
        this._placesService.findById(paramMap.get('id')).subscribe(
          (place:Place)=>{
            //console.log(place);
            if(place){              
              this._place = place;
              this._didLoad = true;
              this._offersForm = new FormGroup({
                title: new FormControl(this._place.title, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
                description: new FormControl(this._place.description, [Validators.required, Validators.minLength(3), Validators.maxLength(120)])
              });
            }          
          }
        )                
      }
    );
  }

  private formSubmitted(){
    Common.validateForm(this._validationResult, '', this._offersForm);    
    this._didValidate = true;
    if(this._offersForm.valid){
      //uradi nešto      
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
      this._placesService.updatePlace(newPlace).subscribe(
        (jason)=>{
          //console.log('ok', jason);
          this.router.navigate(['/','places', 'tabs',  'offers']);
        },
        (error)=>{
          //console.log('error', error);
          this._hasHttpsErrors = true;
        },
        ()=>{
          //console.log('complete');
        }
      )
    }
  }
}
