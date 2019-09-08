import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu, Platform, MenuController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from './../environments/environment';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{

  @ViewChild('first1') private _menu1:IonMenu;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _router: Router,
    private _menuCtrl: MenuController
  ) {      
    this.initializeApp();

    firebase.initializeApp(
      environment.firebaseApiConfiguration
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(){
     let doc = document as any;
     let script = doc.createElement('script');
     script.src= "https://maps.googleapis.com/maps/api/js?key="+environment.googleMapsApiKey;
     script.async = true;
     script.defer = true;

     document.head.appendChild(script);
  }

  bookingItemClicked(){    
    //this._menuCtrl.close("first");
    this._menu1.close();
    this._router.navigate(['/', 'bookings']);
  }
}
