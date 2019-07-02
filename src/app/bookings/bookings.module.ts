import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookingsPage } from './bookings.page';
import { BookingsService } from './bookings.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PlacesService } from '../places/places.service';

const routes: Routes = [
  {
    path: '',
    component: BookingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  providers:[
    BookingsService,
    PlacesService
  ],
  declarations: [BookingsPage]
})
export class BookingsPageModule {}
