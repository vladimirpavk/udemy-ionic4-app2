import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivatePlacesGuardService } from './guards/can-activate-places-guard.service';
import { BookingsService } from './bookings/bookings.service';
import { PlacesService } from './places/places.service';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  { path: 'places', loadChildren: './places/places.module#PlacesPageModule', canActivate: [ CanActivatePlacesGuardService ] },
  { path: 'bookings', loadChildren: './bookings/bookings.module#BookingsPageModule', canActivate: [ CanActivatePlacesGuardService ]},
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
