import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private _authService:AuthService,
    private _router:Router,
    private _loadingCtrl:LoadingController
  ) { }

  ngOnInit() {
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
    console.log(form);

    this.presentLoading();

    this._authService.login();
    setTimeout(()=>{
      this._loadingCtrl.dismiss('firstOne')
      this._router.navigate(['/', 'places']);
    }, 500);    
  }

}
