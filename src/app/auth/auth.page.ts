import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { AuthService } from './auth.service';
import { UiService } from '../common/ui.service';

import { Subscription } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  private _subs:Subscription;
  private _isShown:boolean = false;

  constructor(
    private _authService:AuthService,
    private _router:Router,
    private _loadingCtrl:LoadingController,
    private _uiService:UiService
  ) { }

  ngOnInit() {
    this._subs = this._uiService.isSpinning.subscribe(
      (spinning:boolean)=>{
        if(spinning){
          this.presentLoading();
          this._isShown = true;
        }
        else{
          if(this._isShown){
            this._loadingCtrl.dismiss('firstOne');
            this._router.navigate(['/', 'places']);
          }
        }
      }
    )
  }

  private async presentLoading():Promise<void>{
    const loadingDialog:HTMLIonLoadingElement=await this._loadingCtrl.create({
      id:'firstOne',
      message:'Please wait',
      spinner:'crescent'
    });
    return loadingDialog.present();
  }

  private onLoginClicked(form:NgForm){
    this._authService.login(form.value['email'], form.value['password'])
    .then(
      (firebaseCredentials:firebase.auth.UserCredential)=>{
        console.log(this._authService.tokenId);
      }
    )
    .catch(
      (error:void)=>{
        console.log(error['message']);
      }
    )
  }

  private onSignupClicked(form:NgForm){
    this._authService.signUp(form.value['email'], form.value['password'])
      .then(
        (firebaseCredentials:firebase.auth.UserCredential)=>{
          console.log(this._authService.tokenId);
        }
      )
      .catch(
        (error:void)=>{
          console.log(error['message']);
        }
      )
  }

}
