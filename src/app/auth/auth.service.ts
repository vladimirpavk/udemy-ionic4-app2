import { Injectable } from '@angular/core';
import { UiService } from '../common/ui.service';

import * as fireAuth from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated:boolean = false;
  
  private _userId = 'abc';
  get userId():string{
    return this._userId;
  }  

  constructor(
    private _uiService:UiService
  ) { }

  public isAuth():boolean{   
    return this._isAuthenticated;
  }

  public login(){
    this._uiService.startSpinning();
    setTimeout(()=>{
      this._isAuthenticated = true;
      this._uiService.stopSpinning();
    }, 500);
  }

  public logout(){
    this._isAuthenticated = false;
  }

  public signUp(email:string, password:string){
    fireAuth.auth().createUserWithEmailAndPassword(
      email, password
    ).then(
      (response)=>{
        console.log(response);
      }
    )
  }

}
