import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { OffersPage } from './offers.page';
import { OffersRoutingModule } from './offers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    OffersRoutingModule
  ],
  declarations: [OffersPage]
})
export class OffersPageModule {}
