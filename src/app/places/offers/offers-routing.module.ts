import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { OffersPage } from './offers.page';

const routes: Routes = [
    { path: '', component: OffersPage, pathMatch: 'full' },
    { path: 'offer-bookings/:id', loadChildren: './offer-bookings/offer-bookings.module#OfferBookingsPageModule' },
    { path: 'new-offer', loadChildren: './new-offer/new-offer.module#NewOfferPageModule' },
    { path: 'edit-offer', loadChildren: './edit-offer/edit-offer.module#EditOfferPageModule' }
  ];

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]

})
export class OffersRoutingModule{}