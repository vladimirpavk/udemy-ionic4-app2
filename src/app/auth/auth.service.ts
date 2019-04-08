import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated:boolean = false;

  constructor() { }

  public isAuth():boolean{   
    return this._isAuthenticated;
  }

  public login(){
    this._isAuthenticated = true;
  }

  public logout(){
    this._isAuthenticated = false;
  }

}
