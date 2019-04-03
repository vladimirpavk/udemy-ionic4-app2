import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
  }

  private onButton2Clicked(){
    this._router.navigate(['/', 'places', 'tabs', 'discover']);
  }

}
