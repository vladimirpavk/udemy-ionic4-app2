import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, NavParams } from '@ionic/angular';

import { PlaceDetailPage } from './place-detail.page';
import { CreateBookingPage } from './create-booking/create-booking.page';
import { BookingsService } from '../../../bookings/bookings.service';

const routes: Routes = [
  {
    path: '',
    component: PlaceDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlaceDetailPage, CreateBookingPage],
  entryComponents: [CreateBookingPage],
  providers:[BookingsService]
})
export class PlaceDetailPageModule {}
