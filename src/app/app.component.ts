import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu, Platform, MenuController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase/app';

import * as Config from './common/config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  @ViewChild('first1') private _menu1:IonMenu;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _router: Router,
    private _menuCtrl: MenuController
  ) {
    let config = new Config.ConfigClass();    
    this.initializeApp();

    firebase.initializeApp(
      config.firebaseConfig
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  bookingItemClicked(){    
    //this._menuCtrl.close("first");
    this._menu1.close();
    this._router.navigate(['/', 'bookings']);
  }
}
