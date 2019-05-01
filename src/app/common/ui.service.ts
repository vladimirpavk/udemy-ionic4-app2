import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UiService{
    public isSpinning:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
    
    public startSpinning():void{
        this.isSpinning.next(true);
    }

    public stopSpinning():void{
        this.isSpinning.next(false);
    }

    constructor(){}
}