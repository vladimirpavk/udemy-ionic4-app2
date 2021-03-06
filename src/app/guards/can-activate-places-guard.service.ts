import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class CanActivatePlacesGuardService implements CanActivate{

    constructor(
        private _authService:AuthService,
        private _router:Router
    ){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):Observable<boolean> | Promise<boolean> | boolean{
        let isAuth = false;
        if(this._authService.tokenId != ''){
            isAuth = true;
        }        
        if(!isAuth) this._router.navigate(['/auth']);
        return isAuth;
    }
}