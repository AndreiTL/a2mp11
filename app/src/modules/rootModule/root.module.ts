import {NgModule, ModuleWithProviders} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {LocationService} from './services/location.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    BrowserModule,
    FormsModule
  ]
})
export class RootModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootModule,
      providers: [
        LocationService
      ]
    }
  }
}
