import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UIService{    
    
    constructor(
        private _loadingCtrl:LoadingController
    ){}

    private async _presentLoading(id:string, message:string):Promise<void>{
        const loadingDialog:HTMLIonLoadingElement=await this._loadingCtrl.create({
          id: id,
          message: message,
          spinner:'crescent'
        });
        return loadingDialog.present();
    }

    public showSpinner(id:string, message:string):Promise<void>{
        return this._presentLoading(id, message);
    }

    public hideSpinner(id:string):Promise<void>{
        return this._loadingCtrl.dismiss(id);
    }
    
}