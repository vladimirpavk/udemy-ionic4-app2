import { Injectable, OnInit } from '@angular/core';
import { UiService } from '../common/ui.service';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated:boolean = false;
  private _tokenId:string = '';
  get tokenId(){
    return this._tokenId;
  }

  private _userId = 'abc';
  get userId():string{
    return this._userId;
  }  

  constructor(
    private _uiService:UiService
  ) { 
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          //user logged in
          console.log('user logged in');
          firebase.auth().currentUser.getIdToken()
            .then(
              (token:string)=>{
                this._isAuthenticated = true;
                this._tokenId=token;
              }
            )
        }
        else{
          //user logged out
          this._isAuthenticated = false;
          this._tokenId = '';
        }
      }
    )
  }
  
  public isAuth():boolean{   
    return this._isAuthenticated;
  }

  public login(email:string, password:string):Promise<firebase.auth.UserCredential>{
    /*this._uiService.startSpinning();
    setTimeout(()=>{
      this._isAuthenticated = true;
      this._uiService.stopSpinning();
    }, 500);*/
    return firebase.auth().signInWithEmailAndPassword(email, password);    
  }

  public logout(){
    this._isAuthenticated = false;
  }

  public signUp(email:string, password:string):Promise<firebase.auth.UserCredential>{
    return firebase.auth().createUserWithEmailAndPassword(
      email, password
    );
  }

}
