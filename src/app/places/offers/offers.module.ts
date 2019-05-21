import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { OffersPage } from './offers.page';
import { OffersRoutingModule } from './offers-routing.module';
import { OfferItemComponent } from './offer-item/offer-item.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    OffersRoutingModule
  ],
  declarations: [
    OfferItemComponent,
    OffersPage
  ]
})
export class OffersPageModule {}
