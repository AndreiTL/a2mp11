import { NgModule }      from '@angular/core';

import {SharedModule} from '../sharedModule/shared.module'

import { GooglemapComponent } from './components/googlemap/googlemap.component';

import {GoogleMapLoaderService} from './services/google_maps_loader.service';
import {GoogleMapModelService} from './services/google_maps_model.service';
import {MarkersService} from './services/markers.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    GooglemapComponent
  ],
  providers: [
    GoogleMapLoaderService,
    GoogleMapModelService,
    MarkersService
  ],
  exports: [
    GooglemapComponent
  ]
})
export class GoogleMapModule { }
