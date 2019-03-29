import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { PlacesPage } from './places.page';

const routes: Routes = [
    { path: '', redirectTo: 'tabs', pathMatch: 'full' },
    { path: 'tabs', component: PlacesPage, children:[
      { path: '', redirectTo: 'discover', pathMatch: 'full' },
      { path: 'discover', loadChildren: './discover/discover.module#DiscoverPageModule' },
      { path: 'offers', loadChildren: './offers/offers.module#OffersPageModule' }
     ]
    }, 
    
  ];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class PlacesRoutingModule {}