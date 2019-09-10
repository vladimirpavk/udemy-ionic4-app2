import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Common } from '../../../common/common';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { LocationPickerComponent } from '../../../shared/location-picker/location-picker.component';
import { HttpClient } from '@angular/common/http';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  private _didValidate:boolean = false;
  private _networkError:boolean = false;
  private _validationResult: {[key:string]:boolean} = {};
  private _offerForm: FormGroup;  

  constructor(
    private _placesService:PlacesService,
    private _authService:AuthService,
    private _router:Router,
    private _modalCtrl:ModalController,
    private _httpClient:HttpClient,
    private _browser:InAppBrowser,
    private _camera:Camera
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
        this._placesService.addPlace(
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
        ).subscribe(
          (place:Place)=>{
            console.log(place);
            this._router.navigate(['/', 'places', 'tabs', 'offers']);
          },
          (error:any)=>{
            console.log(error);
            this._networkError = true;
          },
          ()=>{
            console.log('complete');
          }
        )      
    }
  }

  private async createLocationPickerModal():Promise<OverlayEventDetail>{
    const modalDialog:HTMLIonModalElement = await this._modalCtrl.create({
      component:LocationPickerComponent
    });
    modalDialog.present();
    return modalDialog.onDidDismiss();
  }

  private onLocationButtonClicked():void{
    this.createLocationPickerModal().then(
      (data)=>{
        //console.log(data);
        this.geoCode(data.data.lat, data.data.lng).subscribe(
          (response)=>{
            console.log(response);
          },
          (error)=>{
            console.log(error);
          },
          ()=>{
            console.log('completed...');
          }
        )
      }
    ).catch(()=>console.log('catch'));
  }

  private onMakePhotoButtonClicked(){
    //const browser = this._browser.create('https://vladimirpavk.com');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.FILE_URI,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE
    }
    
    this._camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  private geoCode(lat:number, lng:number){
    return this._httpClient.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB8FPbWLlijfbzfyykp308MCZGsQ7Ge-tQ`);
  }
}
