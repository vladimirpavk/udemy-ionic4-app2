import { Injectable, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _tokenId:string = '';
  public get tokenId(){
    return this._tokenId;
  }

  private _userId:string = '';
  public get userId():string{
    return this._userId;
  }

  private _email:string = '';
  public get email():string{
    return this._email;
  }

  constructor() { 
    firebase.auth().onAuthStateChanged(
      (user:firebase.User)=>{
        if(user){
          //user logged in          
          this._tokenId = user['ra'];
          this._userId = user['uid'];
          this._email = user['email'];
        }
        else{
          //user logged out          
          this._tokenId = '';
          this._userId = '';         
          this._email = '';
        }
      }
    )
  }
  
  public login(email:string, password:string):Promise<firebase.auth.UserCredential>{   
    return firebase.auth().signInWithEmailAndPassword(email, password);    
  }

  public logout():Promise<void>{
    return firebase.auth().signOut();
  }

  public signUp(email:string, password:string):Promise<firebase.auth.UserCredential>{
    return firebase.auth().createUserWithEmailAndPassword(email, password);    
  }

}
