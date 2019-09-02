import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LocationPickerComponent } from './location-picker/location-picker.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [
        LocationPickerComponent
    ],
    entryComponents: [
        LocationPickerComponent
    ]
})
export class SharedModule{}