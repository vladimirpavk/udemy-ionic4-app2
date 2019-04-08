import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateBookingPage } from './create-booking/create-booking.page';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  constructor(
    private _router:Router,
    private route:ActivatedRoute,
    private _modalController:ModalController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (paramMap)=>{
        console.log(paramMap.get('id'));
      }
    );  
  }

  private async CreateBookingModal():Promise<OverlayEventDetail> {
    const modalDialog:HTMLIonModalElement = await this._modalController.create({
      component: CreateBookingPage,
      componentProps:{
        value: 123
      }
    });
    modalDialog.present();
    return modalDialog.onDidDismiss();
  }

  private onBookClicked(){
    //this._router.navigate(['/', 'places', 'tabs', 'discover']);       
    const eventDetailPromise:Promise<OverlayEventDetail> = this.CreateBookingModal();
    eventDetailPromise.then(
      (ed:OverlayEventDetail)=>{
        console.log(ed);
      }
    )
  }

}
