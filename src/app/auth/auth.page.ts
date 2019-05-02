import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UiService } from '../common/ui.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

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

  private onLoginClicked(form:any){
    this._authService.login();
  }

  private onSignupClicked(form:NgForm){
    this._authService.signUp(form.value['email'], form.value['password']);
  }

}
