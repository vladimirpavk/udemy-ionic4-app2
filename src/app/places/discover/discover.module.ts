import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DiscoverPage } from './discover.page';

const routes: Routes = [
  { path: '', component: DiscoverPage, pathMatch: 'full' },
  { path: 'place-detail/:id', loadChildren: './discover/place-detail/place-detail.module#PlaceDetailPageModule' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DiscoverPage]
})
export class DiscoverPageModule {}
