import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private _authService:AuthService,
    private _router:Router
  ) { }

  ngOnInit() {
  }

  private onLoginClicked(){
    this._authService.login();    
    this._router.navigate(['/', 'places']);
  }

}
