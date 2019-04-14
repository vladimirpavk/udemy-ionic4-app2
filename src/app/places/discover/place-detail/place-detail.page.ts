import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { CreateBookingPage } from './create-booking/create-booking.page';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  private _id:string;

  constructor(
    private _router:Router,
    private route:ActivatedRoute,
    private _modalController:ModalController,
    private _actionSheetCtrl:ActionSheetController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (paramMap)=>{
        //console.log(paramMap.get('id'));
        this._id = paramMap.get('id')
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

  private async CreateActionSheet() {
    const actionSheet:HTMLIonActionSheetElement = await this._actionSheetCtrl.create(
      {
        id: 'actionSheet1',
        header: 'Book property '+this._id,
        buttons: [{
          text: 'Play (open modal)',
          icon: 'arrow-dropright-circle',
          handler: () => {
            console.log('Play clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      }
    );
    return actionSheet.present();
  }

  private onBookClicked(){
    //this._router.navigate(['/', 'places', 'tabs', 'discover']);       
    /*const eventDetailPromise:Promise<OverlayEventDetail> = this.CreateBookingModal();
    eventDetailPromise.then(
      (ed:OverlayEventDetail)=>{
        console.log(ed);
      }
    );*/
    this.CreateActionSheet().then(
      ()=>{
        console.log('Action sheet presented...');
      }
    )
  }

}
