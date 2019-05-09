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

  private _hasErrors:boolean = false;
  private _errorMessage:string = '';

  constructor(
    private _authService:AuthService,
    private _router:Router,
    private _loadingCtrl:LoadingController,
    private _uiService:UiService
  ) { }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.presentLoading('logging', 'Logging in');
    this._authService.login('vladimirpavk@gmail.com', 'observer')
      .then(
        (user:firebase.auth.UserCredential)=>{
          this._loadingCtrl.dismiss('logging');    
          this._router.navigate(['/', 'places']);
        }
      )
      .catch(
        (error:void)=>{
          this._loadingCtrl.dismiss('logging');
          this._hasErrors = true;
          this._errorMessage = error['message'];         
        }
      );
  }

  private async presentLoading(id:string, message:string):Promise<void>{
    const loadingDialog:HTMLIonLoadingElement=await this._loadingCtrl.create({
      id: id,
      message: message,
      spinner:'crescent'
    });
    return loadingDialog.present();
  }

  private onLoginClicked(form:NgForm){
    this.presentLoading('logging', 'Logging in');
    this._authService.login(form.value['email'], form.value['password'])
      .then(
        (user:firebase.auth.UserCredential)=>{
          this._loadingCtrl.dismiss('logging');    
          this._router.navigate(['/', 'places']);
        }
      )
      .catch(
        (error:void)=>{
          this._loadingCtrl.dismiss('logging');
          this._hasErrors = true;
          this._errorMessage = error['message'];         
        }
      );
}

  private onSignupClicked(form:NgForm){
    this.presentLoading('signin', 'Singing in');
    this._authService.signUp(form.value['email'], form.value['password'])
    .then(
      (user:firebase.auth.UserCredential)=>{
        this._loadingCtrl.dismiss('signin');
        this._router.navigate(['/', 'places']);
      }
    )
    .catch(
      (error:void)=>{
        this._loadingCtrl.dismiss('signin');
        this._hasErrors = true;
        this._errorMessage = error['message'];  
      }
    );
  }

}
