import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated:boolean = false;
  
  private _userId = 'abc';
  get userId():string{
    return this._userId;
  }  

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
