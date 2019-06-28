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
        return await loadingDialog.present();
    }

    public async showSpinner(id:string, message:string):Promise<void>{
        return await this._presentLoading(id, message);
    }

    public async hideSpinner(id:string):Promise<void>{
        return await this._loadingCtrl.dismiss(id);
    }
}